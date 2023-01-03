import { Observable } from 'rxjs';

export interface ImageCropperZoomLimits {
  zoomMin: number;
  zoomMax: number;
}
export interface ImageCropper {
  zoom$: Observable<number>;
  zoomTo(zoom: number): void;
  destroy(): void;
  getCroppedCanvas(fillColor: string): HTMLCanvasElement;
  getZoomLimits(): ImageCropperZoomLimits;
}
