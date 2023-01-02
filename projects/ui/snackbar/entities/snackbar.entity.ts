import { ComponentRef } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar.component';

export class TimUISnackbarRef {
  constructor(private ref: ComponentRef<SnackbarComponent>) {}
  close() {
    this.ref.instance.dismiss();
  }
}
