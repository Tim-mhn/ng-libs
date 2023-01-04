import { IQAirDate } from '@tim-mhn/common/date';

export interface DateRange {
  start?: IQAirDate;
  end?: IQAirDate;
}

export interface TimCalendarCellOption {
  isCurrentMonth: boolean;
  isDisabled?: boolean;
}
