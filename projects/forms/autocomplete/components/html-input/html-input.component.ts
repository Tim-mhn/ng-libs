import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import {
  BaseControlValueAccessor,
  DefaultStateManager,
  ErrorStateMatcher,
  handleFocusLost,
  StateManageable,
  stateManageableProvider,
  StateManager,
} from '@tim-mhn/ng-forms/core';
import { Observable, Subject } from 'rxjs';
import { Key } from '@tim-mhn/common/keyboard';
import { moveCursorToEnd } from '@tim-mhn/common/dom-utils';

@Component({
  selector: 'tim-html-input',
  templateUrl: './html-input.component.html',
  providers: [stateManageableProvider(TimHtmlInput)],
})
export class TimHtmlInput
  extends BaseControlValueAccessor<string>
  implements OnInit, StateManageable
{
  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() ngControl: NgControl
  ) {
    super(ngControl);
  }

  @ViewChild('input', { static: true }) input: ElementRef<HTMLDivElement>;
  @Input() noLineBreak = false;
  @Input() placeholder: string;

  @Output()
  focus = new EventEmitter<Event>();

  @Output()
  blur = new EventEmitter<Event>();

  @Output()
  escaped = new EventEmitter<void>();

  stateManager: StateManager;

  hasError$: Observable<boolean>;

  private _escaped$ = new Subject<void>();
  public escaped$ = this._escaped$.asObservable();

  ngOnInit() {
    if (this.ngControl) this.setStateManager();
  }

  setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher,
      {
        waitForFocusLostToShowError: true,
      }
    );
    this.hasError$ = this.stateManager.hasError$;
    this.stateManager.init();
  }

  onInputChange() {
    this.setValue(this.inputHTML);
  }

  updateFormValueAndUI(newHTML: string) {
    if (this.isDisabled) return;
    this.writeValue(newHTML);
    this.setValue(newHTML);
  }

  focusInput() {
    this.input.nativeElement.focus();
    moveCursorToEnd(this.input.nativeElement, this._doc, this.window);
  }

  onFocusChange(hasFocus: boolean, nativeEvent: Event) {
    if (!hasFocus) {
      handleFocusLost(this.ngControl, this.stateManager);
      this.blur.emit(nativeEvent);
    } else {
      this.focus.emit(nativeEvent);
    }
  }

  private get window() {
    return this._doc.defaultView;
  }

  override writeValue(html: string): void {
    this.input.nativeElement.innerHTML = html;
  }

  public get inputHTML() {
    return this.input.nativeElement.innerHTML;
  }

  @HostListener('keydown', ['$event'])
  emitEscape(e: KeyboardEvent) {
    if (e.key == Key.Escape) this._emitEscape();
    this._allowNonEditableChildrenToBeDeleted(e);
    this._preventLineBreakAndBlurIfNotAllowed(e);
  }

  private _emitEscape() {
    this._escaped$.next();
    this.escaped.emit();
  }

  private _preventLineBreakAndBlurIfNotAllowed(e: KeyboardEvent) {
    if (e.key === Key.Enter && this.noLineBreak) {
      e.preventDefault();
      debugger;
      this.input.nativeElement.blur();
    }
  }

  private _allowNonEditableChildrenToBeDeleted(event: KeyboardEvent) {
    if (window.getSelection && event.key === Key.Backspace) {
      var selection = window.getSelection();
      if (!selection.isCollapsed || !selection.rangeCount) {
        return;
      }

      var curRange = selection.getRangeAt(selection.rangeCount - 1);
      if (
        curRange.commonAncestorContainer.nodeType == 3 &&
        curRange.startOffset > 0
      ) {
        // we are in child selection. The characters of the text node is being deleted
        return;
      }

      var range = document.createRange();
      if (selection.anchorNode != this.input.nativeElement) {
        // selection is in character mode. expand it to the whole editable field
        range.selectNodeContents(this.input.nativeElement);
        range.setEndBefore(selection.anchorNode);
      } else if (selection.anchorOffset > 0) {
        range.setEnd(this.input.nativeElement, selection.anchorOffset);
      } else {
        // reached the beginning of editable field
        return;
      }
      range.setStart(this.input.nativeElement, range.endOffset - 1);

      var previousNode = range.cloneContents().lastChild;
      if (previousNode && (previousNode as any).contentEditable == 'false') {
        // this is some rich content, e.g. smile. We should help the user to delete it
        range.deleteContents();
        event.preventDefault();
      }
    }
  }
}
