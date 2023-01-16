import { ComponentType, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, Injector, StaticProvider, Type } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { TIM_DIALOG_DATA } from '../providers/dialog-data';
import { TimUIDialogRef } from '../entities/dialog-ref';
import { FullScreenDialogContainerComponent } from '../components/full-screen-dialog-container/full-screen-dialog-container.component';
import { DefaultDialogContainerComponent } from '../components/default-dialog-container/default-dialog-container.component';
import { DialogContainer } from '../directives/dialog-container.directive';
import { DialogBgColor } from '../models/dialog-bg-color';

interface DialogOptions {
  fullScreen?: boolean;
  bgColor?: DialogBgColor;
}
@Injectable()
export class TimUIDialogService {
  private _overlayConfigs = new OverlayConfig({
    hasBackdrop: true,
    backdropClass: ['bg-black', '!bg-opacity-40'],
  });

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open<O = void, I = null, C = any>(
    component: ComponentType<C>,
    data?: I,
    opts?: DialogOptions
  ) {
    const overlay = this._overlay.create(this._overlayConfigs);
    const dialogRef = new TimUIDialogRef<O>(overlay);
    const injector = this._createInjector(dialogRef, data);
    const containerClass = this._getContainerClass(opts);

    const containerPortal = new ComponentPortal(containerClass, null, injector);

    const containerRef = overlay.attach(containerPortal);
    const dialog = containerRef.instance;

    if (opts?.bgColor) {
      dialog.bgColor = opts.bgColor;
    }

    dialog.insertComponent(component);

    return dialogRef;
  }

  private _getContainerClass(opts: DialogOptions): Type<DialogContainer> {
    return opts?.fullScreen
      ? FullScreenDialogContainerComponent
      : DefaultDialogContainerComponent;
  }

  private _createInjector<I>(dialogRef: TimUIDialogRef, data: I) {
    const providers: StaticProvider[] = [
      {
        provide: TimUIDialogRef,
        useValue: dialogRef,
      },
      {
        provide: TIM_DIALOG_DATA,
        useValue: data,
      },
    ];

    return Injector.create({
      providers,
      parent: this._injector,
    });
  }
}
