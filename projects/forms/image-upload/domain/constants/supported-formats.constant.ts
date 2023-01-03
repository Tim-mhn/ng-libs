const SUPPORTED_IMG_FORMATS = ['png', 'jpeg', 'jpg', 'gif', 'heic', 'heif'];
export const SUPPORTED_IMG_FORMATS_STRING = SUPPORTED_IMG_FORMATS.join(', ');

export const SUPPORTED_MIME_TYPES = SUPPORTED_IMG_FORMATS.map(
  (ext) => `image/${ext}`
);
export const SUPPORTED_MIME_TYPES_STRING = SUPPORTED_MIME_TYPES.join(', ');
