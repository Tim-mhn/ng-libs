import { Directive, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'tim-checkbox[TimeRangeAllDay]',
})
export class TimTimeRangeAllDayDirective {
  constructor(@Optional() private ngControl: NgControl) {}

  public get control() {
    return this.ngControl.control;
  }
}
