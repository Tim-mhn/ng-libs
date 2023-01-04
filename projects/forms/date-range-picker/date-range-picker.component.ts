/* eslint-disable no-use-before-define */

import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ICONS } from '@tim-mhn/common/icons';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { DateDiff, DATE_FULL } from '@tim-mhn/common/date';
import {
  DefaultStateManager,
  ErrorStateMatcher,
  StateManageable,
  stateManageableProvider,
  StateManager,
} from '@tim-mhn/ng-forms/core';
import { DateRange } from './domain/models/date-picker';

@Component({
  selector: 'tim-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  providers: [
    // eslint-disable-next-line no-use-before-define
    stateManageableProvider(TimDateRangePickerComponent),
  ],
})
export class TimDateRangePickerComponent
  implements OnInit, ControlValueAccessor, StateManageable, OnDestroy
{
  @Input() placeholder: string = 'Select date';
  @Input() maxRange: DateDiff;
  @Input() size: ThemeSize = 'sm';
  @Input() showErrorMessage = true;

  public dateRange: DateRange;

  public readonly CALENDAR_GRAY = ICONS.CALENDAR_OUTLINE_GRAY_500;

  private _onChange: any;
  private _onTouched: any;

  public isActive = false;

  stateManager: StateManager;
  hasError$: Observable<boolean>;
  label: string;
  constructor(
    @Optional() public parent: FormGroupDirective,
    public ngControl: NgControl,
    public errorStateMatcher: ErrorStateMatcher
  ) {
    // eslint-disable-next-line no-param-reassign
    ngControl.valueAccessor = this;
  }

  setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher
    );
  }

  ngOnInit() {
    this.setStateManager();
    this.stateManager.init();
    this.hasError$ = this.stateManager.hasError$;
  }

  onDateRangeUpdated(dateRange: DateRange) {
    this.dateRange = dateRange;
    this._updateLabel();

    this._onChange(this.dateRange);
  }

  private _updateLabel() {
    this.label = `${this.dateRange.start.toFormat(DATE_FULL)} - ${
      this.dateRange.end?.toFormat(DATE_FULL) || 'End date'
    }`;
  }

  private _resetLabel() {
    this.label = this.placeholder;
  }

  writeValue(value: DateRange): void {
    this.dateRange = value;
    if (value) {
      this._updateLabel();
    } else this._resetLabel();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onCalendarClosed() {
    this.isActive = false;
    this._markAsTouchedAndFocusLost();
  }

  onFocused() {
    this.isActive = true;
  }

  private _markAsTouchedAndFocusLost() {
    if (!this.ngControl.control.touched) this.ngControl.control.markAsTouched();
    this.stateManager.focusLost();
  }

  ngOnDestroy(): void {
    this.stateManager.destroy();
  }
}
