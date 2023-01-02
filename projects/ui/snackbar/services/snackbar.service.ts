import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar.component';
import { TimUISnackbarRef } from '../entities/snackbar.entity';
import { TimUISnackBarOptions } from '../models/options';

@Injectable()
export class TimUISnackbar {
  constructor(private _overlay: Overlay) {}

  private _lastSnackbar: TimUISnackbarRef;
  private DEFAULT_SNACKBAR_OPTIONS: TimUISnackBarOptions = {
    dismissible: false,
    duration: 3000,
  };

  open(message: string, _options?: TimUISnackBarOptions): TimUISnackbarRef {
    this._closePreviouslyOpenedSnackbar();
    const overlay = this._overlay.create();
    const containerPortal = new ComponentPortal(SnackbarComponent);

    const options = {
      ...this.DEFAULT_SNACKBAR_OPTIONS,
      ..._options,
    };

    const containerRef = overlay.attach(containerPortal);

    containerRef.instance.message = message;
    containerRef.instance.options = options;
    containerRef.instance.dismissed$.subscribe(() => overlay.detach());

    const snackbarRef = new TimUISnackbarRef(containerRef);
    this._lastSnackbar = snackbarRef;
    return snackbarRef;
  }

  private _closePreviouslyOpenedSnackbar() {
    this._lastSnackbar?.close();
  }
}
