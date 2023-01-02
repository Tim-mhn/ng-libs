import { Directive } from '@angular/core';

@Directive({
  selector: 'tim-card-header-title',
  host: { class: 'text-gray-900 font-medium text-lg flex items-center' },
})
export class CardHeaderTitleDirective {}
