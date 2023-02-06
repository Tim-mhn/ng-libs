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
import { TimDate } from '@tim-mhn/common/date';
import { WEEK_DAY } from '../../domain/constants/calendar.constant';
import {
  DateRange,
  TimCalendarCellOption,
} from '../../domain/models/date-picker';

import { TimCalendarTableCellComponent } from '../calendar-table-cell/calendar-table-cell.component';

@Component({
  selector: 'tim-calendar-table',
  templateUrl: './calendar-table.component.html',
})
export class TimCalendarTableComponent implements OnInit, OnChanges, OnDestroy {
  private _calendarCells: ComponentRef<TimCalendarTableCellComponent>[];

  @Input() monthYear: TimDate;
  @Input() dateRange: DateRange;

  // Maximun date that allow user to select from calendar
  @Input() maxDate: TimDate;

  @ViewChild('calendarTableRef', { read: ViewContainerRef, static: true })
  calendarTableRef: ViewContainerRef;

  @Output() dateSelected = new EventEmitter<TimDate>();

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

  private _renderCalendarTable(monthYear: TimDate, maxDate?: TimDate) {
    this._clearCalendarTable();

    this._renderDaysForPreviousMonth(monthYear, maxDate);

    this._renderDaysForCurrentMonth(monthYear, maxDate);

    this._renderDaysForNextMonth(monthYear, maxDate);

    this._updateCellStatus(this.dateRange);
  }

  private _createTimCalendarTableCell(
    date: TimDate,
    options: TimCalendarCellOption
  ) {
    const cell = this.calendarTableRef.createComponent(
      TimCalendarTableCellComponent
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

  private _renderDaysForCurrentMonth(date: TimDate, maxDate?: TimDate) {
    const numDaysInMonth = date.daysInMonth;

    let day = 1;
    while (day <= numDaysInMonth) {
      let cellOptions: TimCalendarCellOption = {
        isCurrentMonth: true,
      };

      const dayInCurrentMonth = TimDate.local(date.year, date.month, day);

      cellOptions = this._markAsDisabledIfAfterMaxDate(
        cellOptions,
        maxDate,
        dayInCurrentMonth
      );

      this._createTimCalendarTableCell(dayInCurrentMonth, cellOptions);
      day += 1;
    }
  }

  private _renderDaysForPreviousMonth(date: TimDate, maxDate?: TimDate) {
    const prevMonth = date.plus({ months: -1 });
    const lastDayOfPrevMonth = prevMonth.endOf('month');
    const lastDayOfWeekOfPrevMonth =
      lastDayOfPrevMonth.getDayOfWeek() === WEEK_DAY.Sunday
        ? 0
        : lastDayOfPrevMonth.getDayOfWeek();

    let cellOptions: TimCalendarCellOption = {
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

        this._createTimCalendarTableCell(prevDate, cellOptions);
        step -= 1;
      }
    }
  }

  private _renderDaysForNextMonth(date: TimDate, maxDate?: TimDate) {
    const nextMonth = date.plus({ months: 1 });
    const firstDayOfNextMonth = nextMonth.startOf('month');
    const firstDayOfWeekOfNextMonth = firstDayOfNextMonth.getDayOfWeek();

    let cellOptions: TimCalendarCellOption = {
      isCurrentMonth: false,
    };

    if (firstDayOfWeekOfNextMonth !== WEEK_DAY.Sunday) {
      let day = 1;
      const numberDaysUntilFirstSaturday =
        this._getNumberOfDaysUntilFirstSaturday(firstDayOfWeekOfNextMonth);
      while (day < numberDaysUntilFirstSaturday) {
        const nextDate = TimDate.local(nextMonth.year, nextMonth.month, day);

        cellOptions = this._markAsDisabledIfAfterMaxDate(
          cellOptions,
          maxDate,
          nextDate
        );

        this._createTimCalendarTableCell(nextDate, cellOptions);
        day += 1;
      }
    }
  }

  private _markAsDisabledIfAfterMaxDate(
    cellOptions: TimCalendarCellOption,
    maxDate: TimDate,
    compareDate: TimDate
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
