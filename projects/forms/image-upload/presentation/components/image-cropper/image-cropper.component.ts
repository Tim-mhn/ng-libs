import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { firstValueFrom, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { TypedFormBuilder } from '@tim-mhn/common/typed-forms';
import { ImageCropper } from '../../../domain/models/image-cropper';
import { ImageCropperService } from '../../../application/services/image-cropper.service';
import {
  drawImageInCenterOfCanvas,
  fillCanvasWithWhiteWhite,
  setCanvasSide,
} from '../../../application/utils/canvas.utils';

@Component({
  selector: 'iqair-image-cropper',
  templateUrl: './image-cropper.component.html',
})
export class TimUIImageCropperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    private tfb: TypedFormBuilder,
    private _imageCropperService: ImageCropperService
  ) {}

  private readonly WHITE = '#FFFFFF';

  public readonly MINUS_ICON = ICONS.MINUS_GRAY;
  public readonly PLUS_ICON = ICONS.PLUS_GRAY;

  public readonly SLIDER_TINY_STEP = 1e-6;

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  public img: string | ArrayBuffer;

  public zoomCtrl = this.tfb.control<number>(1);

  preparingImage = true;

  private readonly onDestroy$ = new Subject<void>();

  @Input() set base64Content(base64Content: string) {
    if (this._cropper) {
      this._cropper.destroy();
    }
    this._waitForViewToInit().then(async () => {
      await this._prepareImageAndInitCropper(base64Content);
    });
  }

  private _cropper: ImageCropper;

  ngOnInit() {
    this.zoomCtrl.valueChanges.subscribe((zoom) => {
      const zoomWithinLimits = this._getZoomWithinLimits(zoom);
      this._cropper.zoomTo(zoomWithinLimits);
    });
  }

  private async _prepareImageAndInitCropper(imageBase64: string) {
    this.preparingImage = true;
    await this._makeImageSquare(imageBase64);
    // keep setTimeout to avoid issues with Cropper
    setTimeout(async () => {
      await this._initCropperAndZoomBehavior();
      this.preparingImage = false;
    });
  }

  private _makeImageSquare(imageBase64: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        const tmpImage = new Image();

        tmpImage.onload = () => {
          const maxSide = Math.max(tmpImage.width, tmpImage.height);
          setCanvasSide(this.canvas, maxSide);
          fillCanvasWithWhiteWhite(this.canvas);
          drawImageInCenterOfCanvas(tmpImage, this.canvas);

          const outputBase64 = this.canvas.toDataURL();
          this.img = outputBase64;
          resolve();
        };
        tmpImage.src = imageBase64;
      } catch (err) {
        reject(err);
      }
    });
  }

  private get canvas() {
    return this.canvasRef.nativeElement;
  }

  public getCroppedImage(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        this._cropper
          .getCroppedCanvas(this.WHITE)
          .toBlob((b) => resolve(b), 'image/jpeg');
      } catch (err) {
        reject(err);
      }
    });
  }

  public zoomMin: number;
  public zoomMax: number;

  private _setZoomLimits(zoomMin: number, zoomMax: number) {
    this.zoomMin = zoomMin;
    this.zoomMax = zoomMax;
  }

  private _getZoomWithinLimits(zoom: number) {
    if (zoom < this.zoomMin) return this.zoomMin;
    if (zoom > this.zoomMax) return this.zoomMax;
    return zoom;
  }

  private async _initCropperAndZoomBehavior() {
    this._cropper = await this._imageCropperService.initCropper(this.canvas);
    this._setZoomLimitsFromCropper();
    this._updateSliderOnCropperZoom();
  }

  private _setZoomLimitsFromCropper() {
    const { zoomMin, zoomMax } = this._cropper.getZoomLimits();
    this.zoomCtrl.setValue(zoomMin);
    this._setZoomLimits(zoomMin, zoomMax);
  }

  private _updateSliderOnCropperZoom() {
    this._cropper.zoom$.pipe(takeUntil(this.onDestroy$)).subscribe((zoom) => {
      this.zoomCtrl.setValue(zoom, { emitEvent: false });
    });
  }

  private _viewInit$ = new ReplaySubject<void>(1);
  ngAfterViewInit(): void {
    this._viewInit$.next();
    this._viewInit$.complete();
  }

  public zoomOut() {
    const nextZoom = this.zoomCtrl.value * 0.9;
    const zoomWithinLimits = this._getZoomWithinLimits(nextZoom);
    this.zoomCtrl.setValue(zoomWithinLimits);
  }

  public zoomIn() {
    const nextZoom = this.zoomCtrl.value * 1.1;
    const zoomWithinLimits = this._getZoomWithinLimits(nextZoom);
    this.zoomCtrl.setValue(zoomWithinLimits);
  }

  private async _waitForViewToInit() {
    return firstValueFrom(this._viewInit$);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
