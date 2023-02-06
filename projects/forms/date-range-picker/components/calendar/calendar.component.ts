import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimDate } from '@tim-mhn/common/date';
import { DateRange } from '../../domain/models/date-picker';

@Component({
  selector: 'tim-calendar',
  templateUrl: './calendar.component.html',
})
export class TimCalendarComponent implements OnInit {
  @Input() monthYear: TimDate;
  @Input() dateRange: DateRange;
  @Input() maxDate: TimDate;

  @Output() dateSelected = new EventEmitter<TimDate>();

  constructor() {}

  ngOnInit() {}

  onMonthChanged(event: TimDate) {
    this.monthYear = event;
  }

  onDaySelected(date: TimDate) {
    this.dateSelected.emit(date);
  }
}
