import { Directive, ElementRef, OnInit, Optional } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { TimUIDialogService } from '@tim-mhn/ng-ui/dialog';
import { finalize, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { TypedFormControl } from '../../../../../typed-forms';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { handleFocusLost } from '../../../../utils/handle-focus-lost.util';
import {
  ImageCropperDialogInput,
  ImageCropperDialogOutput,
  TimImageCropperDialogComponent,
} from '../../presentation/components/image-cropper-dialog/image-cropper-dialog.component';
import { ImageFile } from './image.entity';
import { ImageUploadError } from '../errors/image-upload.errors';
import { ImageUploadInfo } from '../models/image-upload-info';
import { ImageUploader } from '../models/image-uploader';
import { ImageFileBuilder } from '../../application/services/image-file.builder';
import { ValidImageFile } from '../../application/validators/valid-image.validator';

@Directive()
export abstract class TimBaseImageUpload
  extends BaseControlValueAccessor<ImageUploadInfo>
  implements OnInit
{
  choosingImage: boolean;
  imageUploading: boolean;

  stateManager: StateManager;
  hasError: boolean;

  abstract uploader: ImageUploader;
  abstract includeCropping: boolean;

  protected abstract _fileInputEl: ElementRef;

  constructor(
    private _imageFileBuilder: ImageFileBuilder,
    @Optional() private _parent: FormGroupDirective,
    @Optional() ngControl: NgControl,
    private _errorStateMatcher: ErrorStateMatcher,
    @Optional() private _dialogService: TimUIDialogService
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.ngControl.control.addValidators(ValidImageFile);
    if (this.ngControl) this._setAndInitStateManager();
    this.stateManager?.hasError$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((hasError) => (this.hasError = hasError));
  }
  private _setAndInitStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this._parent,
      this._errorStateMatcher
    );
    this.stateManager.init();
  }

  onDragOver(event: DragEvent) {
    if (!this.isDisabled) {
      event.preventDefault();
      this.choosingImage = true;
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.choosingImage = false;
  }

  onDrop(event: DragEvent) {
    if (!this.isDisabled) {
      event.preventDefault();
      this.onFileChange(event, true);
    }
  }

  onCancel() {
    this.choosingImage = false;
  }

  openFileFolder() {
    if (!this.isDisabled) {
      this.choosingImage = true;
      this._fileInputEl.nativeElement.click();
    }
  }

  private _controlChange$ = new Subject<TypedFormControl<ImageFile>>();
  public controlChange$ = this._controlChange$.asObservable();

  public get control() {
    return this.ngControl.control as TypedFormControl<ImageFile>;
  }

  async onFileChange(event: Event, isDragAndDrop = false) {
    const file = this._getFileFromChangeEvent(event, isDragAndDrop);
    if (!file) return;

    this._handleBeforeUploading();

    const imageFile = await this._buildImageFileAndHandleCropping(file);

    if (!imageFile) {
      this._handleAfterUploading();
      return;
    }

    if (imageFile?.error || !this.uploader) {
      this._handleAfterUploading();
      this.setValue({ imageFile, url: '' });
      return;
    }

    this._uploadImage(imageFile);
  }

  private async _buildImageFileAndHandleCropping(file: Blob) {
    const imageFile = await this._imageFileBuilder.fromBlob(file, {
      compress: !this.includeCropping,
    });

    if (this._canCrop(imageFile)) {
      const croppedImage = firstValueFrom(
        this._dialogService.open<
          ImageCropperDialogOutput,
          ImageCropperDialogInput
        >(TimImageCropperDialogComponent, imageFile).closed$
      );
      return croppedImage;
    }

    return imageFile;
  }

  private _canCrop(imageFile: ImageFile) {
    const noErrorOrMaxSizeError =
      !imageFile.error ||
      imageFile.error === ImageUploadError.MAX_SIZE_EXCEEDED;
    return this.includeCropping && noErrorOrMaxSizeError;
  }

  private _getFileFromChangeEvent(event: Event, isDragAndDrop = false) {
    const files = isDragAndDrop
      ? (<DragEvent>event).dataTransfer.files
      : (<HTMLInputElement>event.target).files;
    return files?.[0];
  }

  private _handleBeforeUploading() {
    this.choosingImage = false;
    this.imageUploading = true;
  }

  private _handleAfterUploading() {
    handleFocusLost(this.ngControl, this.stateManager);
    this.imageUploading = false;
    this._controlChange$.next(this.control);
  }

  private _uploadImage(imageFile: ImageFile) {
    this.uploader
      .uploadImage(imageFile)
      .pipe(
        finalize(() => {
          this._handleAfterUploading();
        })
      )
      .subscribe({
        next: (resp) => {
          this.setValue({ url: resp.url, imageFile });
        },
        error: () => {
          this.setValue({ url: '', imageFile });
          this.ngControl?.control?.setErrors({
            [ImageUploadError.UPLOAD_FAILED]: true,
          });
        },
      });
  }

  removeUploadedImage() {
    this.setValue(null);
    this._fileInputEl.nativeElement.value = '';
  }

  retryUploadImage() {
    this.imageUploading = true;
    if (this.ngControl?.control?.errors[ImageUploadError.UPLOAD_FAILED]) {
      this._uploadImage(this.value?.imageFile);
    }
  }
}
