import { Directive } from '@angular/core';

@Directive({
  selector: 'simple-dialog-actions',
  host: { class: 'flex items-center self-end gap-2' },
})
export class SimpleDialogActionsDirective {}
