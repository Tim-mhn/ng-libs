import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IQAirDate } from '@tim-mhn/common/date';
import { WEEK_DAY } from '../../domain/constants/calendar.constant';
import { TimUICalendarCellOption } from '../../domain/models/date-picker';

@Component({
  selector: 'iqair-calendar-table-cell',
  templateUrl: './calendar-table-cell.component.html',
})
export class TimUICalendarTableCellComponent implements OnInit {
  @ViewChild('dateCell', { static: true }) dateCell: ElementRef;
  @Output() calendarCellClicked = new EventEmitter<IQAirDate>();

  public fullDate: IQAirDate;
  public options: TimUICalendarCellOption;

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
    this.fullDateText = IQAirDate.local(year, month, day).toISO();
    this.date = this.fullDate.day;

    this._isStartOfWeek = this.fullDate.getDayOfWeek() === WEEK_DAY.Sunday;
    this._isEndOfWeek = this.fullDate.getDayOfWeek() === WEEK_DAY.Saturday;
  }

  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const selectedDate = IQAirDate.fromISO(this.fullDateText);
    this.calendarCellClicked.emit(selectedDate);
  }

  resetRounded() {
    this.roundedLeft = false;
    this.roundedRight = false;
  }
}
