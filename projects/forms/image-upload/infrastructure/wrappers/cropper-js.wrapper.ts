import Cropper from 'cropperjs';
import { Subject } from 'rxjs';
import {
  ImageCropper,
  ImageCropperZoomLimits,
} from '../../domain/models/image-cropper';

export class CropperJSWrapper implements ImageCropper {
  private _cropper: Cropper;
  private setCropper(cropper: Cropper) {
    this._cropper = cropper;
  }
  private constructor() {}

  private _zoom$: Subject<number> = new Subject<number>();
  zoom$ = this._zoom$.asObservable();

  zoomTo(zoom: number): void {
    this._cropper.zoomTo(zoom);
  }
  destroy(): void {
    this._cropper.destroy();
  }

  getCroppedCanvas(fillColor: string) {
    return this._cropper.getCroppedCanvas({
      fillColor,
    });
  }

  private _zoomIsOutOfLimits(zoom: number) {
    return zoom < this._zoomMin || zoom > this._zoomMax;
  }

  private readonly ZOOM_MAX_TO_ZOOM_MIN_RATIO = 10;

  private _zoomMin: number;
  private _zoomMax: number;
  private _setZoomLimits(imageData: Cropper.ImageData) {
    const { height, width, naturalWidth, naturalHeight } = imageData;
    const isLandscape = width >= height;

    const zoomMin = isLandscape ? height / naturalHeight : width / naturalWidth;
    const zoomMax = zoomMin * this.ZOOM_MAX_TO_ZOOM_MIN_RATIO;
    this._zoomMin = zoomMin;
    this._zoomMax = zoomMax;
  }

  public getZoomLimits(): ImageCropperZoomLimits {
    return { zoomMin: this._zoomMin, zoomMax: this._zoomMax };
  }

  public static async buildCropper(
    canvas: HTMLCanvasElement,
    containerSizePx: number
  ) {
    return new Promise<ImageCropper>((resolve, _reject) => {
      const imageCropper = new CropperJSWrapper();
      const cropperJS = new Cropper(canvas, {
        cropBoxResizable: false,
        movable: true,
        minContainerHeight: containerSizePx,
        minContainerWidth: containerSizePx,
        minCanvasHeight: containerSizePx,
        minCanvasWidth: containerSizePx,
        minCropBoxHeight: containerSizePx,
        minCropBoxWidth: containerSizePx,
        toggleDragModeOnDblclick: false,
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        dragMode: 'move',
        zoom: (event) => {
          const { ratio } = event.detail;
          if (imageCropper._zoomIsOutOfLimits(ratio)) {
            event.preventDefault();
            return;
          }
          imageCropper._zoom$.next(ratio);
        },
        ready: () => {
          const imageData = cropperJS.getImageData();
          imageCropper._setZoomLimits(imageData);
          resolve(imageCropper);
        },
      });

      imageCropper.setCropper(cropperJS);
    });
  }
}
