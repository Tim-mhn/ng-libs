import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Key } from '@tim-mhn/common/keyboard';
import { Observable } from 'rxjs';
import {
  DefaultStateManager,
  handleFocusLost,
  StateManageable,
  StateManager,
  stateManageableProvider,
  BaseControlValueAccessor,
  ErrorStateMatcher,
} from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'tim-email-list-input',
  templateUrl: './email-list-input.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimEmailListInputComponent)],
})
export class TimEmailListInputComponent
  extends BaseControlValueAccessor<string[]>
  implements OnInit, StateManageable, OnDestroy
{
  @ViewChild('input', { static: true }) inputRef: ElementRef<HTMLInputElement>;

  constructor(
    @Optional() ngControl: NgControl,
    @Optional() private parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher
  ) {
    super(ngControl);
  }

  private readonly ADD_EMAIL_KEYS = [Key.Tab, Key.Enter, Key.Space, Key.Comma];

  stateManager: StateManager;
  hasError$: Observable<boolean>;
  hasFocus: boolean;

  ngOnInit() {
    this.setAndInitStateManager();
    this.hasError$ = this.stateManager?.hasError$;
  }

  private setAndInitStateManager() {
    if (this.ngControl) {
      this.stateManager = new DefaultStateManager(
        this.ngControl.control,
        this.parent,
        this.errorStateMatcher
      );
      this.stateManager.init();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const key = event.key as Key;
    if (this.ADD_EMAIL_KEYS.includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      this._addCurrentTextToEmails();
      return;
    }

    if (key === Key.Backspace && this.currentInputText === '')
      this._removeLastEmail();
  }

  onFocus() {
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
    handleFocusLost(this.ngControl, this.stateManager);
    this._addCurrentTextToEmails();
  }

  private _addCurrentTextToEmails() {
    const email = this.currentInputText;
    if (!email) return;
    const newEmails = [...this.value, email];
    this.setValue(newEmails);
  }

  override setValue(emails: string[]) {
    super.setValue(emails);
    this._resetInput();
  }

  removeEmail(emailIndex: number) {
    handleFocusLost(this.ngControl, this.stateManager);
    const filteredEmails = this.value.filter(
      (_, index) => index !== emailIndex
    );
    this.setValue(filteredEmails);
  }

  private _removeLastEmail() {
    const emailsWithoutLastOne =
      this.value?.slice(0, this.value.length - 1) || [];
    this.setValue(emailsWithoutLastOne);
  }

  private _resetInput() {
    this.inputRef.nativeElement.value = '';
  }

  private get currentInputText() {
    return this.inputRef.nativeElement.value;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }
}
