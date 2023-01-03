import { Directive } from '@angular/core';
import { TimUITimeInputComponent } from '../components/time-input/time-input.component';
import { TimUIRangeTimePart } from './range-time-part.directive';

@Directive({
  selector: 'iqair-time-input[iqairStartTime]',
})
export class TimUIStartTimeDirective extends TimUIRangeTimePart {
  constructor(input: TimUITimeInputComponent) {
    super(input);
  }

  public get jumpToEndTime$() {
    return this.timeInput.jumpToNext$;
  }
}
