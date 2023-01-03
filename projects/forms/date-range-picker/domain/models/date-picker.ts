import { IQAirDate } from '@tim-mhn/common/date';

export interface DateRange {
  start?: IQAirDate;
  end?: IQAirDate;
}

export interface TimUICalendarCellOption {
  isCurrentMonth: boolean;
  isDisabled?: boolean;
}
