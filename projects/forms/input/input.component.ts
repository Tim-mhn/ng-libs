import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Key } from '@tim-mhn/common/keyboard';
import { TimUIPrefix } from '@tim-mhn/ng-forms/core';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { StateManageable, handleFocusLost } from '@tim-mhn/ng-forms/core';
import { InputType } from './models/input-type';
import { InputStyle } from './models/input-style';
import { InputSize } from './models/input-size';

@Component({
  selector: 'tim-input',
  templateUrl: './input.component.html',
  host: {
    class: 'cursor-text',
  },
  providers: [
    // eslint-disable-next-line no-use-before-define
    stateManageableProvider(TimInput),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimInput<T = any>
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

  @Input()
  blurOnEnter = true;

  /**
   * When the input errors, show an error icon.
   * This would replace any Suffix element
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

  @Input()
  size: InputSize = 'md';

  @Output()
  focus = new EventEmitter<Event>();

  @Output()
  blur = new EventEmitter<Event>();

  @Output()
  escaped = new EventEmitter<void>();

  @ContentChild(TimUIPrefix) private _prefix: TimUIPrefix;
  public hasPrefix = false;

  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;

  public override isDisabled = false;
  public hasFocus: boolean;
  public hasError$: Observable<boolean>;

  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() public override ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>
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

  onFocusChange(hasFocus: boolean, nativeEvent: Event) {
    this.hasFocus = hasFocus;
    if (!hasFocus) {
      handleFocusLost(this.ngControl, this.stateManager);
      if (this.ngControl.control.updateOn === 'blur')
        this.setValue(this._tempValue);
    }

    if (hasFocus) this.focus.emit(nativeEvent);
    else this.blur.emit(nativeEvent);
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

  private _escaped$ = new Subject<void>();
  public escaped$ = this._escaped$.asObservable();

  @HostListener('keydown', ['$event'])
  cancelEscape(event: KeyboardEvent) {
    if (event.key === Key.Escape) {
      event.preventDefault();
      event.stopPropagation();
      this.escaped.emit();
      this._escaped$.next();
    }

    if (event.key === Key.Enter) {
      if (this.blurOnEnter) this.input.nativeElement.blur();
    }
  }
}
