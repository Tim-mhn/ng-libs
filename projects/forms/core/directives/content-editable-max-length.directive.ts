import { Directive, HostListener, Inject, Input } from '@angular/core';
import { Key } from '@tim-mhn/common/keyboard';

@Directive({
  selector: '[contentEditableMaxLength]',
})
export class ContentEditableMaxLengthDirective {
  @Input('contentEditableMaxLength') contentMaxLength: number;
  constructor() {}

  private NON_TEXT_INPUT_KEYS = [
    Key.Control,
    Key.ArrowLeft,
    Key.ArrowDown,
    Key.ArrowRight,
    Key.ArrowUp,
    Key.Enter,
    Key.Escape,
    Key.Backspace,
    Key.Delete,
    Key.Tab,
  ] as string[];

  /**
   * Only pastes the maximum numbers of characters allowed by @contentMaxLength  and
   * current text length
   * @param event
   */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const target = event.target as HTMLElement;
    const textToPaste = event.clipboardData.getData('text/plain');
    const content = target.innerText;
    const contentLength = content.length;

    event.preventDefault();
    const selectedText = this.getCurrentlySelectedText(
      event.target as HTMLElement
    );
    const allowedPasteLength =
      this.contentMaxLength - contentLength + selectedText.length;
    const slicedPasteText = textToPaste.substring(0, allowedPasteLength);
    event.preventDefault();
    // deprecated but still supported by all browsers
    // see https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand#browser_compatibility
    document.execCommand('insertHTML', false, slicedPasteText);
  }

  /**
   * Returns any selected text for the given element
   * @param el
   * @returns
   */
  getCurrentlySelectedText(el: HTMLElement) {
    let selectedText = '';

    if (document.activeElement === el) {
      selectedText = window.getSelection().toString();
    }

    return selectedText;
  }

  /**
   * Prevent user from typing more than he is allowed to by @contentMaxLength
   *
   * @param event
   * @returns
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // don't prevent event if user does something else than typing a character
    if (this.NON_TEXT_INPUT_KEYS.includes(event.key)) return;

    const content = (event.target as HTMLElement).innerText;
    const currentLength = content.length;
    if (currentLength >= this.contentMaxLength) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
