import { ValidationErrorToMessage } from '@tim-mhn/ng-forms/core';
import { ImageUploadError } from '../errors/image-upload.errors';

export const IMAGE_VALIDATION_ERROR_MESSAGES: ValidationErrorToMessage = {
  [ImageUploadError.TYPE_NOT_SUPPORTED]: () => 'Image type not supported.',
  [ImageUploadError.MAX_SIZE_EXCEEDED]: () => 'Image is too big.',
  [ImageUploadError.DUPLICATED]: () => 'No duplicate images.',
  [ImageUploadError.COMPRESSION_FAILED]: () => 'Error compressing the image.',
  [ImageUploadError.REQUIRED]: () => 'Image required.',
  [ImageUploadError.UPLOAD_FAILED]: () => 'Upload failed.',
};
