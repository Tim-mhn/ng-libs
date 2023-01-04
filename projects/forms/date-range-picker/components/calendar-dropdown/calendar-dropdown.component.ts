import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { objectKeys } from '@tim-mhn/common/objects';
import { DateDiff, IQAirDate } from '@tim-mhn/common/date';
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

    this.monthYearForCalendarTwo = this.dateRange?.end || IQAirDate.now();
    this.monthYearForCalendarOne =
      this.dateRange?.start.month === this.monthYearForCalendarTwo.month
        ? this.dateRange?.start.plus({ months: -1 })
        : this.dateRange?.start;
  }

  @Input() set maxRange(maxRange: DateDiff) {
    if (maxRange) {
      const keys = objectKeys(maxRange);
      if (keys.length > 0 && keys[0] === 'days')
        this._maxRange = { days: maxRange.days - 1 };
      else this._maxRange = maxRange;
    } else this._maxRange = maxRange;
  }

  private _maxRange: DateDiff;

  @Output() dateRangeChanged = new EventEmitter<DateRange>();
  @Output() calendarOpened = new EventEmitter();
  @Output() calendarClosed = new EventEmitter();

  trigger: TimDatePickerTriggerDirective;

  isOpen = false;

  dateRange: DateRange;
  _previousDateRange: DateRange;

  private _isChangingStartDate = false;
  private _isChangingEndDate = false;

  public monthYearForCalendarOne: IQAirDate;
  public monthYearForCalendarTwo: IQAirDate;

  public disableApply: boolean = true;

  private _today = IQAirDate.now();
  public maxDate: IQAirDate = this._today;

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
    this.maxDate = this._today;
    this._restorePreviousDateRange();
    this.calendarClosed.emit();
  }

  public setTrigger(trigger: TimDatePickerTriggerDirective) {
    this.trigger = trigger;
  }

  handleDateSelected(newDate: IQAirDate) {
    if (!this.dateRange) {
      this.dateRange = { start: newDate, end: null };
      this._updateMaxDate(this.dateRange.start);
      return;
    }

    if (this._isChangingStartDate) {
      if (newDate.isAfter(this.dateRange.end, { ignoreTime: true })) {
        this.dateRange = { start: newDate, end: null };
      } else {
        this.dateRange = { ...this.dateRange, start: newDate };
      }

      this._isChangingStartDate = false;
      this._updateMaxDate(this.dateRange.start);
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

    this._updateMaxDate(this.dateRange.start);
    this._toggleDisableApply();
  }

  onStartDateClick() {
    this.maxDate = this._today;
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

  private _updateMaxDate(startDate: IQAirDate) {
    const newMaxDate = this._maxRange
      ? startDate.plus(this._maxRange)
      : this._today;
    this.maxDate = newMaxDate.isAfter(this._today, { ignoreTime: true })
      ? this._today
      : newMaxDate;

    if (
      this.dateRange.end &&
      this.dateRange.end.isAfter(this.maxDate, { ignoreTime: true })
    ) {
      this.dateRange.end = this.maxDate;
    }
  }

  private _setDefaultDateRange() {
    this.monthYearForCalendarTwo = IQAirDate.now();
    this.monthYearForCalendarOne = this.monthYearForCalendarTwo.plus({
      months: -1,
    });
  }
}
