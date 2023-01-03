import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { IQAirDate } from '@tim-mhn/common/date';
import { MONTH_LABELS } from '../../domain/constants/calendar.constant';

@Component({
  selector: 'iqair-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
})
export class TimUICalendarNavigationComponent implements OnInit {
  @Input() set monthYear(date: IQAirDate) {
    this.selectedDate = date;
    this.year = this.selectedDate.year;
    this.month = this.selectedDate.month - 1;
  }
  @Output() monthChanged = new EventEmitter<IQAirDate>();

  private selectedDate: IQAirDate;
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
