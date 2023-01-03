import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[contentEditablePlaceholder]',
  host: {
    class:
      'editable-placeholder:text-gray-400 editable-placeholder:content-[attr(placeholder)]',
  },
})
export class ContentEditablePlaceholderDirective {
  @Input() set contentEditablePlaceholder(placeholder: string) {
    this.el.nativeElement.setAttribute('placeholder', placeholder);
  }
  constructor(private el: ElementRef<HTMLElement>) {}

  /**
   * On Firefox and Safari, when erasing content from a contenteditable element,
   * the browsers keep a <br> tag instead of empty string.
   * This prevents the placeholder to be shown
   * @ref https://github.com/st-h/ember-content-editable/issues/92
   */
  @HostListener('input', ['$event'])
  showPlaceholderAfterErasingContentForNonChromiumBrowsers(event: InputEvent) {
    const { innerHTML } = event.target as HTMLElement;
    if (innerHTML === '<br>') this.el.nativeElement.innerHTML = '';
  }
}
