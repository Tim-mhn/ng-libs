import { TimDate } from '@tim-mhn/common/date';

export interface DateRange {
  start?: TimDate;
  end?: TimDate;
}

export interface TimCalendarCellOption {
  isCurrentMonth: boolean;
  isDisabled?: boolean;
}
