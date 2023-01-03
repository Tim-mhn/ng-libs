import { Injectable } from '@angular/core';
import { ImageCropper } from '../../domain/models/image-cropper';
import { CropperJSWrapper } from '../../infrastructure/wrappers/cropper-js.wrapper';

@Injectable()
export class ImageCropperService {
  private readonly CROPPER_SIZE_PX = 160;
  constructor() {}

  public initCropper(canvas: HTMLCanvasElement): Promise<ImageCropper> {
    return CropperJSWrapper.buildCropper(canvas, this.CROPPER_SIZE_PX);
  }
}
