import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { TimUIDialogService } from '@tim-mhn/ng-ui/dialog';
import { neitherNullNorUndefined } from '@tim-mhn/common/objects';
import { TypedChanges } from '@tim-mhn/common/extra-types';

import { BASE_AVATAR_PLACEHOLDER_SRC } from '@tim-mhn/ng-ui/avatar';
import {
  IMAGE_VALIDATION_ERROR_MESSAGES,
  SUPPORTED_MIME_TYPES_STRING,
} from '../../../domain/constants';
import { TimUIBaseImageUpload } from '../../../domain/entities/abstract-base-image-upload';
import { ImageUploadError } from '../../../domain/errors/image-upload.errors';
import { ImageFileBuilder } from '../../../application/services/image-file.builder';
import { ProfileImageUploadSize } from '../../../domain/models/profile-image-upload-size';
import { ImageUploader } from '../../../domain/models/image-uploader';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'iqair-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
})
export class TimUIProfileImageUploadComponent
  extends TimUIBaseImageUpload
  implements OnInit, OnChanges
{
  showProfileImage = true;
  showPlaceholderText = false;
  @ViewChild('fileInput', { static: true }) _fileInputEl: ElementRef;

  @Input() uploader: ImageUploader;
  @Input() includeCropping = true;
  @Input() placeholderText: string;
  @Input() profilePlaceholderSrc: string = BASE_AVATAR_PLACEHOLDER_SRC;
  @Input() size: ProfileImageUploadSize = 'md';

  readonly SUPPORTED_MIME_TYPES_STRING = SUPPORTED_MIME_TYPES_STRING;
  readonly IMAGE_VALIDATION_ERROR_MESSAGES = IMAGE_VALIDATION_ERROR_MESSAGES;
  readonly UPLOAD_FAILED_ERROR = ImageUploadError.UPLOAD_FAILED;

  readonly AVATAR_CLASSES = 'block rounded-full';

  private readonly AVATAR_ERROR_CLASSES = 'outline outline-1 outline-red-300';
  readonly AVATAR_PROFILE_ERROR_CLASSES = `${this.AVATAR_ERROR_CLASSES} outline-offset-[-1px]`;
  readonly AVATAR_INITIAL_ERROR_CLASSES = `${this.AVATAR_ERROR_CLASSES} -outline-offset-[-1px]`;
  constructor(
    @Optional() _parent: FormGroupDirective,
    @Optional() ngControl: NgControl,
    _errorStateMatcher: ErrorStateMatcher,
    _dialogService: TimUIDialogService,
    _imageFileBuilder: ImageFileBuilder
  ) {
    super(
      _imageFileBuilder,
      _parent,
      ngControl,
      _errorStateMatcher,
      _dialogService
    );
  }
  ngOnChanges(changes: TypedChanges<TimUIProfileImageUploadComponent>): void {
    if (changes.placeholderText || changes.profilePlaceholderSrc) {
      this._handleProfilePlaceHolder();
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.ngControl?.valueChanges.subscribe(() =>
      this._handleProfilePlaceHolder()
    );
  }

  private _handleProfilePlaceHolder() {
    this.showPlaceholderText =
      !this.value?.imageFile?.image && !!this.placeholderText;
    this.showProfileImage =
      neitherNullNorUndefined(this.value?.imageFile?.image) ||
      (!this.showPlaceholderText && !!this.profilePlaceholderSrc);
  }
}
