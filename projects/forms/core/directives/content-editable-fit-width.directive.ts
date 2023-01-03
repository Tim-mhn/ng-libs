import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[contentEditableFitWidth]',
  host: {
    contenteditable: 'true',
    class: 'w-fit flex',
  },
})
export class ContentEditableFitWidthDirective {
  constructor(private el: ElementRef) {}
}
