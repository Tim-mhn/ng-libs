import { Injectable } from '@angular/core';

@Injectable()
export class FileConversionService {
  public async convertHEICToJPEG(file: Blob): Promise<Blob> {
    // Dynamically import heic2any to reduce initial chunk size (since library ~ 300kb)
    const heic2any = await this._dynamicallyImportHEIC2Any();
    const quality = 0.5;
    return heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality,
    }) as Promise<Blob>;
  }

  private _dynamicallyImportHEIC2Any = () =>
    import('heic2any').then((heic2any) => heic2any.default);
}
