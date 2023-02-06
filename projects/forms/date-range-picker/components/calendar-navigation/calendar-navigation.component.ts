import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { TimDate } from '@tim-mhn/common/date';
import { MONTH_LABELS } from '../../domain/constants/calendar.constant';

@Component({
  selector: 'tim-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
})
export class TimCalendarNavigationComponent implements OnInit {
  @Input() set monthYear(date: TimDate) {
    this.selectedDate = date;
    this.year = this.selectedDate.year;
    this.month = this.selectedDate.month - 1;
  }
  @Output() monthChanged = new EventEmitter<TimDate>();

  private selectedDate: TimDate;
  public month: number;
  public year: number;

  public readonly ARROW_LEFT = ICONS.ARROW_LEFT_GRAY;
  public readonly ARROW_RIGHT = ICONS.ARROW_RIGHT_GRAY;

  public MONTH_LABELS = MONTH_LABELS;

  constructor() {}

  ngOnInit() {}

  onPreviousClick() {
    this.selectedDate = this._getNewMonth('prev');
    this.monthChanged.emit(this.selectedDate);
  }
  onNextClick() {
    this.selectedDate = this._getNewMonth('next');
    this.monthChanged.emit(this.selectedDate);
  }

  private _getNewMonth(action: 'next' | 'prev') {
    let newMonth;
    if (action === 'next') newMonth = this.selectedDate.plus({ months: 1 });
    if (action === 'prev') newMonth = this.selectedDate.plus({ months: -1 });

    this.month = newMonth.month - 1;
    this.year = newMonth.year;
    return newMonth;
  }
}
