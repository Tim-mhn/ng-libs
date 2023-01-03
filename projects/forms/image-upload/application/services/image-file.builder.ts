import { Injectable } from '@angular/core';
import { MAX_IMAGE_SIZE } from '../../domain/constants';
import { FileType } from '../../domain/entities/file-type.entity';
import { ImageFile } from '../../domain/entities/image.entity';
import {
  ImageUploadError,
  UploadErrorId,
} from '../../domain/errors/image-upload.errors';
import { FileCompressionService } from './file-compression.service';
import { FileConversionService } from './file-conversion.service';
import { FileEncodingService } from './file-encoding.service';

export interface ImageFileBuilderOptions {
  compress: boolean;
}
@Injectable()
export class ImageFileBuilder {
  constructor(
    private _fileEncodingService: FileEncodingService,
    private _fileConversionService: FileConversionService,
    private _fileCompressionService: FileCompressionService
  ) {}

  public async fromBlob(
    file: Blob,
    opts: ImageFileBuilderOptions = { compress: true }
  ) {
    let processedFile = file;
    let error: UploadErrorId;

    try {
      const isHEIC = await FileType.isHEIC(file);
      const isTypeSupported = await FileType.isTypeSupported(file);

      if (isHEIC)
        processedFile = await this._fileConversionService.convertHEICToJPEG(
          file
        );

      if (isTypeSupported && file.size > MAX_IMAGE_SIZE && opts?.compress) {
        processedFile = await this._fileCompressionService.compress(
          processedFile,
          MAX_IMAGE_SIZE
        );
      }
    } catch (err) {
      error = ImageUploadError.GENERAL_ERROR;
    }

    // Get base64 encoding data -> used to check for duplicates
    const { base64Encoding, base64EncodingWithoutType } =
      await this._fileEncodingService.getBase64EncodingFromBlob(processedFile);

    const imageFileProps = {
      image: base64Encoding,
      content: base64EncodingWithoutType,
      file: processedFile,
      error,
    };

    const imageFile = await ImageFile.createImageFile(imageFileProps);

    return imageFile;
  }
}
