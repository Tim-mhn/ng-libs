import { CursorPosition } from '@tim-mhn/common/dom-utils';
import { TimTimeInputComponent } from '../components/time-input/time-input.component';

export class TimRangeTimePart {
  constructor(public timeInput: TimTimeInputComponent) {}

  public get control() {
    return this.timeInput.control;
  }

  public get valueChanges() {
    return this.control.valueChanges;
  }

  public get validTimeEntered$() {
    return this.timeInput.validTimeEntered$;
  }

  public focusOnMinutes(pos: CursorPosition) {
    this.timeInput.focusOnMinutes(pos);
  }

  public focusOnHours(pos: CursorPosition) {
    this.timeInput.focusOnHours(pos);
  }
}
