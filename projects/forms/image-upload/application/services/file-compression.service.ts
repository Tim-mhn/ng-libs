import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';
import { ImageUploadError } from '../../domain/errors/image-upload.errors';

@Injectable()
export class FileCompressionService {
  public async compress(file: Blob, maxSize: number) {
    let quality = 0.9;
    let compressedFile = file;

    while (compressedFile.size > maxSize && quality >= 0) {
      // eslint-disable-next-line no-await-in-loop
      compressedFile = await this._compressor(compressedFile, quality);
      quality -= 0.1;
    }

    return compressedFile;
  }

  private _compressor(file: Blob, quality: number): Promise<File> {
    return new Promise(
      (resolve, reject) =>
        // eslint-disable-next-line no-promise-executor-return
        new Compressor(file, {
          quality,
          strict: true,
          maxHeight: 960, // this sets width and height under the limits and preserves aspect ratio and image quality
          maxWidth: 1440,
          convertSize: 0, // convert all png to jpeg
          success: (compressedFile) => {
            resolve(compressedFile as File);
          },
          error: () => reject(ImageUploadError.COMPRESSION_FAILED),
        })
    );
  }
}
