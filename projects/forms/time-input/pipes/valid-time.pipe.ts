import { Pipe, PipeTransform } from '@angular/core';
import { TimeOfDay } from '@tim-mhn/common/date';
import { isValidTime } from '../utils/is-valid-time.util';

@Pipe({
  name: 'validTime',
})
export class ValidTimePipe implements PipeTransform {
  transform(time: TimeOfDay) {
    return isValidTime(time);
  }
}
