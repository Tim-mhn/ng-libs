import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, takeUntil } from 'rxjs';

export class TimUIDialogRef<O = any> {
  private _backDropClose = true;
  constructor(private _overlay: OverlayRef) {
    this._closeOnBackdropClick$();
  }

  private _closed$ = new Subject<O>();
  public readonly closed$ = this._closed$.asObservable();

  public close(data?: O) {
    this._overlay.dispose();
    // setTimeout to allow dialog to close immediately and avoid click jank
    setTimeout(() => {
      this._closed$.next(data);
      this._closed$.complete();
    });
  }

  private _closeOnBackdropClick$() {
    this._overlay
      .backdropClick()
      .pipe(takeUntil(this.closed$))
      .subscribe(() => {
        if (this._backDropClose) {
          this.close();
        }
      });
  }

  disableBackDropClose() {
    this._backDropClose = false;
  }

  enableBackDropClose() {
    this._backDropClose = true;
  }
}
