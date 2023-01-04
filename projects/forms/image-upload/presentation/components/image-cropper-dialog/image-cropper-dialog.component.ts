import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TimUIDialogRef, IQAIR_DIALOG_DATA } from '@tim-mhn/ng-ui/dialog';
import { from, switchMap } from 'rxjs';
import { RequestState, RequestStateController } from '@tim-mhn/common/http';
import { ImageFile } from '../../../domain/entities/image.entity';
import { ImageFileBuilder } from '../../../application/services/image-file.builder';
import { TimImageCropperComponent } from '../image-cropper/image-cropper.component';

export type ImageCropperDialogInput = ImageFile;
export type ImageCropperDialogOutput = ImageFile;
@Component({
  selector: 'tim-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
})
export class TimImageCropperDialogComponent implements OnInit {
  constructor(
    @Inject(IQAIR_DIALOG_DATA) public inputImage: ImageCropperDialogInput,
    @Inject(TimUIDialogRef)
    private _dialogRef: TimUIDialogRef<ImageCropperDialogOutput>,
    private _imageFileBuilder: ImageFileBuilder,
    private _reqStateController: RequestStateController
  ) {}

  @ViewChild(TimImageCropperComponent) cropper: TimImageCropperComponent;

  requestState = new RequestState();
  ngOnInit() {}

  onSave() {
    const croppedImg$ = from(this.cropper.getCroppedImage());

    croppedImg$
      .pipe(
        switchMap((blob) => this._imageFileBuilder.fromBlob(blob)),
        this._reqStateController.handleRequest(this.requestState)
      )
      .subscribe((imageFile) => {
        this._dialogRef.close(imageFile);
      });
  }
}
