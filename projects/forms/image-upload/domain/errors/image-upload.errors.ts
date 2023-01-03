export type UploadErrorId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type UploadErrorName =
  | 'TYPE_NOT_SUPPORTED'
  | 'MAX_SIZE_EXCEEDED'
  | 'DUPLICATED'
  | 'COMPRESSION_FAILED'
  | 'REQUIRED'
  | 'UPLOAD_FAILED'
  | 'GENERAL_ERROR';

export const ImageUploadError: { [key in UploadErrorName]: UploadErrorId } = {
  TYPE_NOT_SUPPORTED: 1,
  MAX_SIZE_EXCEEDED: 2,
  DUPLICATED: 3,
  COMPRESSION_FAILED: 4,
  REQUIRED: 5,
  UPLOAD_FAILED: 6,
  GENERAL_ERROR: 7,
};
