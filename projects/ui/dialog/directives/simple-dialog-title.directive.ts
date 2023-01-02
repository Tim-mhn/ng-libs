import { Directive } from '@angular/core';

@Directive({
  selector: 'simple-dialog-title',
  host: { class: 'text-lg font-medium text-gray-900' },
})
export class SimpleDialogTitleDirective {}
