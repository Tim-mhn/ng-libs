import { ImageUploadError, UploadErrorId } from '../errors/image-upload.errors';
import { MAX_IMAGE_SIZE } from '../constants/max-size.constant';
import { FileType } from './file-type.entity';

export interface ImageFileProps {
  image: string;
  content: string;
  error?: UploadErrorId;
  file: Blob;
}

export class ImageFile {
  private _image: string;
  private _content: string;
  private _error: UploadErrorId;
  private _file: Blob;

  public get image() {
    return this._image;
  }

  public get content() {
    return this._content;
  }

  public get error() {
    return this._error;
  }

  public get file() {
    return this._file;
  }

  public static async createImageFile(
    imgProps: ImageFileProps
  ): Promise<ImageFile> {
    const imageFile = new ImageFile(imgProps);

    // if image has already got error, no need to check for other errors
    const imageHasError = !!imageFile.error;
    if (!imageHasError) {
      await imageFile._checkIfImageCompatible();
    }
    return imageFile;
  }

  private constructor(props: ImageFileProps) {
    const { file, image, content, error } = props;
    this._image = image;
    this._content = content;
    this._file = file;
    this._error = error;
  }

  private async _checkIfImageCompatible() {
    this._checkAndMarkAsSizeExceeded();
    await this._checkAndMarkAsFileNotSupported();
  }

  private _checkSizeExceeded() {
    return this._file.size > MAX_IMAGE_SIZE;
  }

  private _markAsSizeExceeded() {
    this._error = ImageUploadError.MAX_SIZE_EXCEEDED;
  }

  private _checkAndMarkAsSizeExceeded() {
    const isSizeExceeded = this._checkSizeExceeded();
    if (isSizeExceeded) {
      this._markAsSizeExceeded();
    }
  }

  private _markAsFileNotSupported() {
    this._error = ImageUploadError.TYPE_NOT_SUPPORTED;
  }

  private async _checkAndMarkAsFileNotSupported() {
    const fileSupported = await FileType.isTypeSupported(this._file);

    if (!fileSupported) {
      this._markAsFileNotSupported();
    }
  }
}
