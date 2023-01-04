import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQAirDate } from '@tim-mhn/common/date';
import { DateRange } from '../../domain/models/date-picker';

@Component({
  selector: 'tim-calendar',
  templateUrl: './calendar.component.html',
})
export class TimCalendarComponent implements OnInit {
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
