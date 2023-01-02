import { Directive } from '@angular/core';

@Directive({
  selector: 'simple-dialog-description',
  host: { class: 'text-sm font-normal text-gray-500' },
})
export class SimpleDialogDescriptionDirective {}
