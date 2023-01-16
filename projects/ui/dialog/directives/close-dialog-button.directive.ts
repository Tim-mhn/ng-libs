import { Directive, HostListener, Input } from '@angular/core';
import { TimUIDialogRef } from '../entities/dialog-ref';

@Directive({
  selector: '[timCloseDialogButton]',
  host: {
    class: 'cursor-pointer',
  },
})
export class TimUICloseDialogButtonDirective<T = any> {
  constructor(private _dialogRef: TimUIDialogRef<T>) {}

  @Input('timCloseDialogButton') dialogCloseOutput: T;

  @HostListener('click', ['$event'])
  closeDialogOnClick() {
    this._dialogRef.close(this.dialogCloseOutput);
  }
}
