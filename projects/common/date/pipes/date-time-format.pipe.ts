import { Pipe, PipeTransform } from '@angular/core';
import { TimDate } from '../entities/date.entity';
import { DATE_FULL } from '../constants/date-time-format.constants';
@Pipe({
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(dateTime: TimDate, format: string = DATE_FULL): string {
    if (dateTime) return dateTime.toFormat(format);
    return '';
  }
}
