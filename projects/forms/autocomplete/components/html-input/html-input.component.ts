import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Optional,
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

  focus() {
    this.input.nativeElement.focus();
    moveCursorToEnd(this.input.nativeElement, this._doc, this.window);
  }

  onFocusLost() {
    handleFocusLost(this.ngControl, this.stateManager);
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
    if (e.key == Key.Escape) this._escaped$.next();
  }
}
