// eslint-disable-next-line max-classes-per-file
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Key } from '@tim-mhn/common/keyboard';
import {
  BaseControlValueAccessor,
  DefaultStateManager,
  DEFAULT_VALIDATION_ERROR_TO_MESSAGE,
  ErrorStateMatcher,
  StateManageable,
  StateManager,
} from '@tim-mhn/ng-forms/core';
import { EditableHeaderInputMode } from './editable-header-input-mode';

@Component({
  selector: 'tim-editable-header-input',
  templateUrl: './editable-header-input.component.html',
})
export class EditableHeaderInputComponent
  extends BaseControlValueAccessor<string>
  implements OnInit, AfterViewInit, StateManageable
{
  @Input() placeholder: string = 'Enter a name';
  @Input() mode: EditableHeaderInputMode = 'text';

  readonly errorMessageMap = DEFAULT_VALIDATION_ERROR_TO_MESSAGE;
  // use replay subject to be sure subscriptions made after emission of first value can execute
  private _afterViewInit$ = new ReplaySubject<void>(1);

  stateManager: StateManager;
  public hasError$: Observable<boolean>;

  readonly CONTENT_MAX_LENGTH = 50;

  constructor(
    @Optional() public parent: FormGroupDirective,
    @Optional() public override ngControl: NgControl,
    private errorStateMatcher: ErrorStateMatcher
  ) {
    super(ngControl);
  }

  @ViewChild('input', { static: true }) input: ElementRef<HTMLElement>;

  ngOnInit() {
    if (this.ngControl) this.setStateManager();
    this.stateManager?.init();
  }

  ngAfterViewInit() {
    this._afterViewInit$.next();
    this._afterViewInit$.complete();
  }

  setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher
    );
    this.hasError$ = this.stateManager.hasError$;
  }

  private _tmpValue: string;
  onInputChange(e: Event) {
    const value = this._getContent(e.target as HTMLElement);
    this._tmpValue = value;
  }

  override writeValue(v: string) {
    this.value = v;
    this._tmpValue = v;
    this._afterViewInit$.subscribe(() => {
      this._updateContent(v);
    });
  }

  @HostListener('keydown', ['$event'])
  onClick(event: KeyboardEvent) {
    // eslint-disable-next-line default-case
    switch (event.key) {
      case Key.Enter:
        this.onEnter();
        break;

      case Key.Escape:
        this.onEscape();
        break;
    }
  }

  onEnter() {
    this.input.nativeElement.blur();
  }

  private blurTriggeredByEscape = false;
  onEscape() {
    this.blurTriggeredByEscape = true;
    this.input.nativeElement.blur();
    this._updateContent(this.value);
  }

  private _getContent(el: HTMLElement) {
    return this.mode === 'html' ? el.innerHTML : el.textContent;
  }

  private _updateContent(content: string) {
    if (this.mode === 'html') {
      this.input.nativeElement.innerHTML = content;
      return;
    }

    this.input.nativeElement.textContent = content;
  }

  onBlur() {
    this.stateManager.focusLost();
    // onBlur may be called by the onEscape function. If it's the case, don't setValue
    // don't emit, if "new" value is the same as before
    if (!this.blurTriggeredByEscape && this.value !== this._tmpValue) {
      this.setValue(this._tmpValue);
    }
    this.blurTriggeredByEscape = false;
  }
}
