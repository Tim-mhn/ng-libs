import { Pipe, PipeTransform } from '@angular/core';
import { IQAirDate } from '../entities/date.entity';
import { DATE_FULL } from '../constants/date-time-format.constants';
@Pipe({
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(dateTime: IQAirDate, format: string = DATE_FULL): string {
    if (dateTime) return dateTime.toFormat(format);
    return '';
  }
}
