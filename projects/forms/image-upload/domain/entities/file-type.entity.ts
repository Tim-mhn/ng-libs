import { fromBlob } from 'file-type/browser';
import { SUPPORTED_MIME_TYPES } from '../constants/supported-formats.constant';

export class FileType {
  constructor() {}

  private static async _getFileType(file: Blob) {
    const fileType = await fromBlob(file);
    return fileType;
  }

  public static async isTypeSupported(file: Blob) {
    const fileType = await this._getFileType(file);
    const mime = fileType?.mime;
    return SUPPORTED_MIME_TYPES.includes(mime);
  }

  public static async isHEIC(file: Blob) {
    const fileType = await this._getFileType(file);
    return (
      fileType?.ext === 'heic' ||
      fileType?.mime === 'image/heic' ||
      fileType?.mime === 'image/heif'
    );
  }
}
