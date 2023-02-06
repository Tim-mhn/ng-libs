import { Directive } from '@angular/core';
import { TimTimeInputComponent } from '../components/time-input/time-input.component';
import { TimRangeTimePart } from './range-time-part.directive';

@Directive({
  selector: 'tim-time-input[timeEndTime]',
})
export class TimEndTimeDirective extends TimRangeTimePart {
  constructor(input: TimTimeInputComponent) {
    super(input);
  }

  public get jumpToStartTime$() {
    return this.timeInput.jumpToPrevious$;
  }
}
