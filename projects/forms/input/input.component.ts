import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Key } from '@tim-mhn/common/keyboard';
import { InputType } from '@tim-mhn/ng-forms/core';
import { TimUIPrefix } from '@tim-mhn/ng-forms/core';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { StateManageable, handleFocusLost } from '@tim-mhn/ng-forms/core';
import { InputStyle } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'iqair-input',
  templateUrl: './input.component.html',
  host: {
    class: 'cursor-text',
  },
  providers: [
    // eslint-disable-next-line no-use-before-define
    stateManageableProvider(TimUIInput),
  ],
})
export class TimUIInput<T = any>
  extends BaseControlValueAccessor<T>
  implements OnInit, AfterContentInit, OnDestroy, StateManageable
{
  public readonly WARNING_ICON_SRC =
    'assets/icons/exclamation-circle-outline-red-500.svg';

  @Input()
  placeholder: string = '';
  @Input()
  name!: string;
  @Input()
  type: InputType = InputType.TEXT;

  @Input()
  squaredRightBorder: boolean;

  /**
   * When the input errors, show an error icon.
   * This would replace any iqairSuffix element
   */
  @Input() showErrorIcon = true;

  /**
   * if true, component is flex and grows as much as possible based on available space
   * If false, fixed width of 320px
   */
  @Input()
  flexWidth = false;

  @Input()
  minValue: number;

  @Input()
  style: InputStyle = 'normal';

  @ContentChild(TimUIPrefix) private _prefix: TimUIPrefix;
  public hasPrefix = false;

  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;

  public override isDisabled = false;
  public hasFocus: boolean;
  public hasError$: Observable<boolean>;

  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() public override ngControl: NgControl
  ) {
    super(ngControl);
    this.setStateManager();
  }

  stateManager: DefaultStateManager;

  private _tempValue: T;

  setStateManager() {
    /** StateManager set in constructor with control initially (ngControl.control is null until OnInit lifecycle hook)
     * Allows other form components (like PasswordInput) to use this StateManager as soon as AfterContentInit
     * StateManager's control will be set in ngOnInit */
    this.stateManager = new DefaultStateManager(
      null,
      this.parent,
      this.errorStateMatcher,
      {
        waitForFocusLostToShowError: true,
      }
    );
    this.hasError$ = this.stateManager.hasError$;
  }

  ngOnInit() {
    this.stateManager?.setControl(this.ngControl.control);
    this.stateManager?.init();
  }

  onFocusChange(hasFocus: boolean) {
    this.hasFocus = hasFocus;
    if (!hasFocus) {
      handleFocusLost(this.ngControl, this.stateManager);
      if (this.ngControl.control.updateOn === 'blur')
        this.setValue(this._tempValue);
    }
  }

  ngAfterContentInit() {
    this.hasPrefix = !!this._prefix;
  }

  onInputChange(e: Event) {
    this._tempValue = <T>(<any>(<HTMLInputElement>e.target).value);
    if (this.ngControl.control.updateOn === 'blur' && this.hasFocus) return;
    this.setValue(this._tempValue);
  }

  focusInput() {
    this.input?.nativeElement?.focus();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }

  @HostListener('keydown', ['$event'])
  cancelEscape(event: KeyboardEvent) {
    if (event.key === Key.Escape) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
