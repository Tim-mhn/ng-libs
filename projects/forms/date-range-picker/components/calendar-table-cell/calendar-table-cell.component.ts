import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TimDate } from '@tim-mhn/common/date';
import { WEEK_DAY } from '../../domain/constants/calendar.constant';
import { TimCalendarCellOption } from '../../domain/models/date-picker';

@Component({
  selector: 'tim-calendar-table-cell',
  templateUrl: './calendar-table-cell.component.html',
})
export class TimCalendarTableCellComponent implements OnInit {
  @ViewChild('dateCell', { static: true }) dateCell: ElementRef;
  @Output() calendarCellClicked = new EventEmitter<TimDate>();

  public fullDate: TimDate;
  public options: TimCalendarCellOption;

  public fullDateText: string;
  public date: number;
  public isSelected = false;
  public isInRange = false;
  public roundedLeft: boolean;
  public roundedRight: boolean;

  public _isStartOfWeek: boolean;
  public _isEndOfWeek: boolean;

  constructor() {}

  ngOnInit() {
    const { year, month, day } = this.fullDate;
    this.fullDateText = TimDate.local(year, month, day).toISO();
    this.date = this.fullDate.day;

    this._isStartOfWeek = this.fullDate.getDayOfWeek() === WEEK_DAY.Sunday;
    this._isEndOfWeek = this.fullDate.getDayOfWeek() === WEEK_DAY.Saturday;
  }

  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const selectedDate = TimDate.fromISO(this.fullDateText);
    this.calendarCellClicked.emit(selectedDate);
  }

  resetRounded() {
    this.roundedLeft = false;
    this.roundedRight = false;
  }
}
