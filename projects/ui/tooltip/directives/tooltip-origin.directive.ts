import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { TimUITooltipContainerComponent } from '../components/tooltip-container/tooltip-container.component';
import { ABOVE, AFTER, BEFORE, BELOW } from '../constants/positions.constants';
import { TooltipPosition } from '../models/tooltip-position';
import { TimUITooltip } from './tooltip.directive';

@Directive({
  selector: '[timTooltipOrigin]',
})
export class TimUITooltipOrigin implements OnDestroy {
  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _overlay: Overlay
  ) {}

  private _tooltip: TimUITooltip;
  hideTimeoutId: any;
  @Input() tooltipPosition: TooltipPosition = TooltipPosition.BOTTOM;
  @Input() disabled: boolean;
  @Input() set timTooltipOrigin(tooltip: TimUITooltip) {
    console.log('set tim tooltip called');
    this._tooltip = tooltip;
    this.elementRef.nativeElement.onmouseover = () =>
      this.disabled ? this.hideTooltip() : this.showTooltip();
    this.elementRef.nativeElement.onmouseout = () => {
      this.hideTooltip();
    };
  }

  ngOnDestroy(): void {
    (this.elementRef.nativeElement as any).removeAllListeners();
    this._overlayRef?.dispose();
  }

  private _tooltipContainer: TimUITooltipContainerComponent;
  private _overlayRef: OverlayRef;

  showTooltip() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
    if (this._tooltipContainer) {
      this._tooltipContainer.visible = true;
      return;
    }

    if (!this._tooltip) {
      if (this._tooltipContainer) this._tooltipContainer.visible = false;
      return;
    }
    this._createOverlay();
    const containerPortal = new ComponentPortal<TimUITooltipContainerComponent>(
      TimUITooltipContainerComponent
    );
    const containerRef = this._overlayRef.attach(containerPortal);
    containerRef.instance.bgColor = this._tooltip.color;
    this._tooltipContainer = containerRef.instance;
    this._tooltipContainer.insertTemplate(this._tooltip.templateRef);
  }

  hideTooltip() {
    const timeout = 2000;
    if (this._tooltipContainer) this._tooltipContainer.visible = false;
    this.hideTimeoutId = setTimeout(() => {
      this._overlayRef?.dispose();
      this._tooltipContainer = null;
    }, timeout);
  }

  private _createOverlay() {
    const position = this._getPositionOption(this.tooltipPosition);
    const overlayConf = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([position]),
      scrollStrategy: this._overlay.scrollStrategies.close(),
    });
    this._overlayRef = this._overlay.create(overlayConf);
  }

  private _getPositionOption(position: TooltipPosition) {
    const map = {
      [TooltipPosition.TOP]: ABOVE,
      [TooltipPosition.BOTTOM]: BELOW,
      [TooltipPosition.LEFT]: BEFORE,
      [TooltipPosition.RIGHT]: AFTER,
    };

    return map[position];
  }
}
