import { Injectable } from '@angular/core';

@Injectable()
export class FileEncodingService {
  public getBase64EncodingFromBlob(blob: Blob): Promise<{
    base64Encoding: string;
    base64EncodingWithoutType: string;
  }> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        const base64Encoding = fileReader.result as string;
        // Strip out mimetype from encoding
        const base64EncodingWithoutType = base64Encoding
          .toString()
          .replace(/^data:image\/[a-z]+;base64,/, '')
          .replace(/^data:application\/[a-z]+;base64,/, '');

        resolve({ base64Encoding, base64EncodingWithoutType });
      };
    });
  }
}
