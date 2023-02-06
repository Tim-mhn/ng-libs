import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DateDiff, TimDate } from '@tim-mhn/common/date';
import { DateRange } from '../../domain/models/date-picker';
import { TimDatePickerTriggerDirective } from '../../directives/date-picker-trigger.directive';

@Component({
  selector: 'tim-calendar-dropdown',
  templateUrl: './calendar-dropdown.component.html',
})
export class TimCalendarDropdownComponent implements OnInit, OnChanges {
  @Input() set initialDateRange(initialDateRange: DateRange) {
    this.dateRange = initialDateRange;

    if (!this.dateRange) {
      this._setDefaultDateRange();
      return;
    }

    this.monthYearForCalendarTwo = this.dateRange?.end || TimDate.now();
    this.monthYearForCalendarOne =
      this.dateRange?.start.month === this.monthYearForCalendarTwo.month
        ? this.dateRange?.start.plus({ months: -1 })
        : this.dateRange?.start;
  }

  @Output() dateRangeChanged = new EventEmitter<DateRange>();
  @Output() calendarOpened = new EventEmitter();
  @Output() calendarClosed = new EventEmitter();

  trigger: TimDatePickerTriggerDirective;

  isOpen = false;

  dateRange: DateRange;
  _previousDateRange: DateRange;

  private _isChangingStartDate = false;
  private _isChangingEndDate = false;

  public monthYearForCalendarOne: TimDate;
  public monthYearForCalendarTwo: TimDate;

  public disableApply: boolean = true;

  public maxDate: TimDate = null;

  constructor() {}

  ngOnInit() {
    if (!this.dateRange) {
      this._setDefaultDateRange();
    }
  }

  ngOnChanges(): void {}

  public open() {
    this.isOpen = true;
    this.disableApply = true;
    this._savePreviousDateRange();
    this.calendarOpened.emit();
  }

  public close() {
    this.isOpen = false;
    this._restorePreviousDateRange();
    this.calendarClosed.emit();
  }

  public setTrigger(trigger: TimDatePickerTriggerDirective) {
    this.trigger = trigger;
  }

  handleDateSelected(newDate: TimDate) {
    if (!this.dateRange) {
      this.dateRange = { start: newDate, end: null };
      return;
    }

    if (this._isChangingStartDate) {
      if (newDate.isAfter(this.dateRange.end, { ignoreTime: true })) {
        this.dateRange = { start: newDate, end: null };
      } else {
        this.dateRange = { ...this.dateRange, start: newDate };
      }

      this._isChangingStartDate = false;
      this._toggleDisableApply();
      return;
    }

    if (this._isChangingEndDate) {
      if (!newDate.isAfter(this.dateRange.start, { ignoreTime: true })) {
        this.dateRange = { start: newDate, end: null };
      } else {
        this.dateRange = { ...this.dateRange, end: newDate };
      }
      this._isChangingEndDate = false;
      this._toggleDisableApply();

      return;
    }

    if (this.dateRange.start) {
      if (this.dateRange.start.isAfter(newDate, { ignoreTime: true })) {
        this.dateRange = { start: newDate, end: null };
      } else {
        this.dateRange = { ...this.dateRange, end: newDate };
      }
    }

    this._toggleDisableApply();
  }

  onStartDateClick() {
    this._isChangingStartDate = true;
  }

  onEndDateClick() {
    this._isChangingEndDate = true;
  }

  onApply() {
    this.dateRangeChanged.emit(this.dateRange);
    this.close();
  }

  onCancel() {
    this.close();
  }

  private _savePreviousDateRange() {
    if (this.dateRange) this._previousDateRange = this.dateRange;
  }

  private _restorePreviousDateRange() {
    this.dateRange = this._previousDateRange;
  }

  private _toggleDisableApply() {
    if (this.dateRange)
      this.disableApply = !(this.dateRange.start && this.dateRange.end);
    else this.disableApply = true;
  }

  private _setDefaultDateRange() {
    this.monthYearForCalendarTwo = TimDate.now();
    this.monthYearForCalendarOne = this.monthYearForCalendarTwo.plus({
      months: -1,
    });
  }
}
