import { Directive, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'iqair-checkbox[iqairTimeRangeAllDay]',
})
export class TimUITimeRangeAllDayDirective {
  constructor(@Optional() private ngControl: NgControl) {}

  public get control() {
    return this.ngControl.control;
  }
}
