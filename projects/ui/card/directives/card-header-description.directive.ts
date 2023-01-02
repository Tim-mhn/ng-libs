import { Directive } from '@angular/core';

@Directive({
  selector: 'tim-card-header-description, [tim-card-header-description]',
  host: { class: 'text-sm' },
})
export class CardHeaderDescriptionDirective {}
