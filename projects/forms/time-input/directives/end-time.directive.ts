import { Directive } from '@angular/core';
import { TimUITimeInputComponent } from '../components/time-input/time-input.component';
import { TimUIRangeTimePart } from './range-time-part.directive';

@Directive({
  selector: 'iqair-time-input[iqairEndTime]',
})
export class TimUIEndTimeDirective extends TimUIRangeTimePart {
  constructor(input: TimUITimeInputComponent) {
    super(input);
  }

  public get jumpToStartTime$() {
    return this.timeInput.jumpToPrevious$;
  }
}
