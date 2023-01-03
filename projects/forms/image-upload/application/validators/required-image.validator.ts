import { AbstractControl, ValidatorFn } from '@angular/forms';
import { nullOrUndefined } from '@tim-mhn/common/objects';
import { ImageUploadError } from '../../domain/errors/image-upload.errors';
import { ImageUploadInfo } from '../../domain/models/image-upload-info';

export const RequiredImage: ValidatorFn = (absControl: AbstractControl) => {
  if (nullOrUndefined(absControl?.value)) {
    return { [ImageUploadError.REQUIRED]: true };
  }
  const imageFile = absControl?.value as ImageUploadInfo;

  return imageFile?.imageFile?.content === ''
    ? { [ImageUploadError.REQUIRED]: true }
    : null;
};
