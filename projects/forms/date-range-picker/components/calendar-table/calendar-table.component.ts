import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IQAirDate } from '@tim-mhn/common/date';
import { WEEK_DAY } from '../../domain/constants/calendar.constant';
import {
  DateRange,
  TimUICalendarCellOption,
} from '../../domain/models/date-picker';

import { TimUICalendarTableCellComponent } from '../calendar-table-cell/calendar-table-cell.component';

@Component({
  selector: 'iqair-calendar-table',
  templateUrl: './calendar-table.component.html',
})
export class TimUICalendarTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  private _calendarCells: ComponentRef<TimUICalendarTableCellComponent>[];

  @Input() monthYear: IQAirDate;
  @Input() dateRange: DateRange;

  // Maximun date that allow user to select from calendar
  @Input() maxDate: IQAirDate;

  @ViewChild('calendarTableRef', { read: ViewContainerRef, static: true })
  calendarTableRef: ViewContainerRef;

  @Output() dateSelected = new EventEmitter<IQAirDate>();

  private _onDestroy$ = new Subject<void>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.monthYear || changes?.dateRange || changes?.maxDate) {
      this._renderCalendarTable(this.monthYear, this.maxDate);
    }
  }

  private _updateCellStatus(dateRange: DateRange) {
    if (!dateRange) return;

    for (let i = 0; i < this._calendarCells.length; i += 1) {
      const currentCell = this._calendarCells[i].instance;
      const currentDate = currentCell.fullDate;

      if (
        this.dateRange.start &&
        currentDate.equals(this.dateRange.start, { ignoreTime: true })
      ) {
        currentCell.isSelected = true;
        currentCell.roundedLeft = true;
      } else if (
        this.dateRange.end &&
        currentDate.equals(this.dateRange.end, { ignoreTime: true })
      ) {
        currentCell.isSelected = true;
        currentCell.roundedRight = true;
      } else {
        currentCell.isSelected = false;
        currentCell.resetRounded();
      }

      if (this.dateRange.end) {
        if (
          currentCell.fullDate.toMillis() >= this.dateRange.start.toMillis() &&
          currentCell.fullDate.toMillis() <= this.dateRange.end.toMillis()
        ) {
          currentCell.isInRange = true;
        } else currentCell.isInRange = false;
      } else {
        currentCell.isInRange = false;
      }
    }
  }

  private _clearCalendarTable() {
    this._calendarCells = [];
    this.calendarTableRef.clear();
  }

  private _renderCalendarTable(monthYear: IQAirDate, maxDate?: IQAirDate) {
    this._clearCalendarTable();

    this._renderDaysForPreviousMonth(monthYear, maxDate);

    this._renderDaysForCurrentMonth(monthYear, maxDate);

    this._renderDaysForNextMonth(monthYear, maxDate);

    this._updateCellStatus(this.dateRange);
  }

  private _createTimUICalendarTableCell(
    date: IQAirDate,
    options: TimUICalendarCellOption
  ) {
    const cell = this.calendarTableRef.createComponent(
      TimUICalendarTableCellComponent
    );
    cell.instance.fullDate = date;
    cell.instance.options = options;
    cell.instance.calendarCellClicked
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((selectedDate) => {
        this.dateSelected.emit(selectedDate);
      });

    this._calendarCells.push(cell);
    return cell;
  }

  private _renderDaysForCurrentMonth(date: IQAirDate, maxDate?: IQAirDate) {
    const numDaysInMonth = date.daysInMonth;

    let day = 1;
    while (day <= numDaysInMonth) {
      let cellOptions: TimUICalendarCellOption = {
        isCurrentMonth: true,
      };

      const dayInCurrentMonth = IQAirDate.local(date.year, date.month, day);

      cellOptions = this._markAsDisabledIfAfterMaxDate(
        cellOptions,
        maxDate,
        dayInCurrentMonth
      );

      this._createTimUICalendarTableCell(dayInCurrentMonth, cellOptions);
      day += 1;
    }
  }

  private _renderDaysForPreviousMonth(date: IQAirDate, maxDate?: IQAirDate) {
    const prevMonth = date.plus({ months: -1 });
    const lastDayOfPrevMonth = prevMonth.endOf('month');
    const lastDayOfWeekOfPrevMonth =
      lastDayOfPrevMonth.getDayOfWeek() === WEEK_DAY.Sunday
        ? 0
        : lastDayOfPrevMonth.getDayOfWeek();

    let cellOptions: TimUICalendarCellOption = {
      isCurrentMonth: false,
    };

    if (lastDayOfWeekOfPrevMonth !== WEEK_DAY.Saturday) {
      let step = lastDayOfWeekOfPrevMonth;
      while (step >= 0) {
        const prevDate = lastDayOfPrevMonth.plus({ days: -step });

        cellOptions = this._markAsDisabledIfAfterMaxDate(
          cellOptions,
          maxDate,
          prevDate
        );

        this._createTimUICalendarTableCell(prevDate, cellOptions);
        step -= 1;
      }
    }
  }

  private _renderDaysForNextMonth(date: IQAirDate, maxDate?: IQAirDate) {
    const nextMonth = date.plus({ months: 1 });
    const firstDayOfNextMonth = nextMonth.startOf('month');
    const firstDayOfWeekOfNextMonth = firstDayOfNextMonth.getDayOfWeek();

    let cellOptions: TimUICalendarCellOption = {
      isCurrentMonth: false,
    };

    if (firstDayOfWeekOfNextMonth !== WEEK_DAY.Sunday) {
      let day = 1;
      const numberDaysUntilFirstSaturday =
        this._getNumberOfDaysUntilFirstSaturday(firstDayOfWeekOfNextMonth);
      while (day < numberDaysUntilFirstSaturday) {
        const nextDate = IQAirDate.local(nextMonth.year, nextMonth.month, day);

        cellOptions = this._markAsDisabledIfAfterMaxDate(
          cellOptions,
          maxDate,
          nextDate
        );

        this._createTimUICalendarTableCell(nextDate, cellOptions);
        day += 1;
      }
    }
  }

  private _markAsDisabledIfAfterMaxDate(
    cellOptions: TimUICalendarCellOption,
    maxDate: IQAirDate,
    compareDate: IQAirDate
  ) {
    if (compareDate.isAfter(maxDate)) {
      return { ...cellOptions, isDisabled: true };
    }

    return { ...cellOptions };
  }

  private _getNumberOfDaysUntilFirstSaturday(firstDayOfWeekOfMonth: number) {
    return WEEK_DAY.Sunday - (firstDayOfWeekOfMonth - 1);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
