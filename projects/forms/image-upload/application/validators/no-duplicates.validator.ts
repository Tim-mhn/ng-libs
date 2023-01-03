import { AbstractControl } from '@angular/forms';
import { ImageUploadError } from '../../domain/errors/image-upload.errors';
import { ImageUploadInfo } from '../../domain/models/image-upload-info';

export const NoDuplicateImages = (controls: AbstractControl) => {
  const imageContents: string[] = controls?.value
    .map((pictureInfo: ImageUploadInfo) => pictureInfo?.imageFile?.content)
    .filter((content: string) => !!content);
  const uniqueImageContents = new Set(imageContents);
  const hasDuplicates = uniqueImageContents.size < imageContents.length;
  return hasDuplicates ? { [ImageUploadError.DUPLICATED]: true } : null;
};
