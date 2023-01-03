import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CursorPosition, moveCursorToEnd } from '@tim-mhn/common/dom-utils';
import { Observable, Subject } from 'rxjs';
import { TimeOfDay } from '@tim-mhn/common/date';
import { TypedAbstractControl } from '@tim-mhn/common/typed-forms';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { requiredTimeInputValidator } from '../../validators/required.validator';
import { TimUITimePeriodInputComponent } from '../time-period-input/time-period-input.component';

@Component({
  selector: 'iqair-time-input',
  templateUrl: './time-input.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimUITimeInputComponent)],
})
export class TimUITimeInputComponent
  extends BaseControlValueAccessor<TimeOfDay>
  implements ControlValueAccessor, StateManageable
{
  override value: TimeOfDay = new TimeOfDay({
    hours: null,
    minutes: null,
  });

  stateManager: StateManager;
  constructor(
    @Optional() public parent: FormGroupDirective,
    @Optional() public override ngControl: NgControl,
    private errorStateMatcher: ErrorStateMatcher,
    @Inject(DOCUMENT) private _doc: Document
  ) {
    super(ngControl);
  }
  @Input() disabledMinutes = false;

  @ViewChild('hoursInput', { static: true })
  hoursInput: TimUITimePeriodInputComponent;
  @ViewChild('minsInput', { static: true })
  minsInput: TimUITimePeriodInputComponent;

  public hasError$: Observable<boolean>;

  private _validTimeEntered$ = new Subject<void>();
  public validTimeEntered$ = this._validTimeEntered$.asObservable();

  private _jumpToPrevious$ = new Subject<void>();
  public jumpToPrevious$ = this._jumpToPrevious$.asObservable();

  private _jumpToNext$ = new Subject<void>();
  public jumpToNext$ = this._jumpToNext$.asObservable();

  public addValidator(validatorFn: ValidatorFn) {
    this.ngControl?.control?.addValidators(validatorFn);
  }

  ngOnInit() {
    if (this.ngControl) this._setStateManager();

    this.stateManager?.init();
    this._addCustomRequiredValidatorIfRequired();
  }

  private _addCustomRequiredValidatorIfRequired() {
    if (this.ngControl?.control?.hasValidator(Validators.required)) {
      this.addValidator(requiredTimeInputValidator);
    }
  }

  hoursFocused = false;
  minsFocused = false;

  private _setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher
    );
    this.hasError$ = this.stateManager.hasError$;
  }

  override writeValue(v: TimeOfDay): void {
    this.value = new TimeOfDay({
      minutes: v?.minutes,
      hours: v?.hours,
    });
  }

  onHoursChange(hours: number) {
    const newTimeOfDay = new TimeOfDay({
      ...this.value,
      hours,
    });
    this.setValue(newTimeOfDay);
  }

  onMinutesChange(minutes: number) {
    const newTimeOfDay = new TimeOfDay({
      ...this.value,
      minutes,
    });
    this.setValue(newTimeOfDay);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }

  onHoursFocusChange(focus: boolean) {
    this.hoursFocused = focus;
    this._updateTouchedAndFocusedStates(focus);
  }

  onMinsFocusChange(focus: boolean) {
    this.minsFocused = focus;
    this._updateTouchedAndFocusedStates(focus);
  }

  onTimePeriodCompleted() {
    this.focusOnMinutes();
  }

  onHoursJumpToPrevious() {
    this._jumpToPrevious$.next();
  }

  onMinsJumpToNext() {
    this._jumpToNext$.next();
  }

  public focusOnHours(position: CursorPosition = 'start') {
    this._focusOnHoursOrMinutes(this.hoursInput, position);
  }

  public focusOnMinutes(position: CursorPosition = 'start') {
    this._focusOnHoursOrMinutes(this.minsInput, position);
  }

  private _focusOnHoursOrMinutes(
    hoursOrMins: TimUITimePeriodInputComponent,
    position: CursorPosition = 'start'
  ) {
    setTimeout(() => {
      position === 'start'
        ? hoursOrMins.focusInput()
        : moveCursorToEnd(
            hoursOrMins.timePeriodEl.nativeElement,
            this._doc,
            this._doc.defaultView
          );
    });
  }

  onMinutesCompleted() {
    this._validTimeEntered$.next();
  }

  private _focusChange$ = new Subject<boolean>();
  public focusChange$ = this._focusChange$.asObservable();

  private _updateTouchedAndFocusedStates(focused: boolean) {
    const updateFn = () => {
      this._focusChange$.next(!this.hasLostFocus);
      if (this.hasLostFocus) this.stateManager?.focusLost();

      if (this.hasLostFocus && !this.ngControl?.control?.touched) {
        this.ngControl?.control?.markAsTouched();
      }
    };

    /** If a child loses focus, add timeout to allow child to emit and know if
     * it is focused
     */
    const timeoutToCheckIfOtherChildIsFocused = () =>
      focused ? updateFn() : setTimeout(() => updateFn());

    timeoutToCheckIfOtherChildIsFocused();
  }

  private get hasLostFocus() {
    return !this.hoursFocused && !this.minsFocused;
  }

  public get control() {
    return this.ngControl.control as TypedAbstractControl<TimeOfDay>;
  }
}
