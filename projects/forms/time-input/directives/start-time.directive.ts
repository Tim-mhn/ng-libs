import { Directive } from '@angular/core';
import { TimTimeInputComponent } from '../components/time-input/time-input.component';
import { TimRangeTimePart } from './range-time-part.directive';

@Directive({
  selector: 'tim-time-input[StartTime]',
})
export class TimStartTimeDirective extends TimRangeTimePart {
  constructor(input: TimTimeInputComponent) {
    super(input);
  }

  public get jumpToEndTime$() {
    return this.timeInput.jumpToNext$;
  }
}
