import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[contentEditableIf]',
})
export class ContentEditableIfDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @Input() set contentEditableIf(editable: boolean) {
    this.el.nativeElement.contentEditable = editable ? 'true' : 'false';
  }
}
