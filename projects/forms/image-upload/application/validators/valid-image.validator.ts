import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ImageUploadInfo } from '../../domain/models/image-upload-info';

export const ValidImageFile: ValidatorFn = (control: AbstractControl) => {
  const imageUploadInfo = control.value as ImageUploadInfo;
  return imageUploadInfo?.imageFile?.error
    ? { [imageUploadInfo?.imageFile?.error]: true }
    : null;
};
