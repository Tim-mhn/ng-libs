import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQAirDate } from '@tim-mhn/common/date';
import { DateRange } from '../../domain/models/date-picker';

@Component({
  selector: 'iqair-calendar',
  templateUrl: './calendar.component.html',
})
export class TimUICalendarComponent implements OnInit {
  @Input() monthYear: IQAirDate;
  @Input() dateRange: DateRange;
  @Input() maxDate: IQAirDate;

  @Output() dateSelected = new EventEmitter<IQAirDate>();

  constructor() {}

  ngOnInit() {}

  onMonthChanged(event: IQAirDate) {
    this.monthYear = event;
  }

  onDaySelected(date: IQAirDate) {
    this.dateSelected.emit(date);
  }
}
