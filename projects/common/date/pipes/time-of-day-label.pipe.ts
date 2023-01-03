import { Pipe, PipeTransform } from '@angular/core';
import { TimeOfDay } from '../entities/time-of-day.entity';

@Pipe({
  name: 'timeOfDayLabel',
})
export class TimeOfDayLabelPipe implements PipeTransform {
  transform(time: TimeOfDay): string {
    return time?.toString() || '00:00';
  }
}
