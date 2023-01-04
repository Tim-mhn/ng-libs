import { Component } from '@angular/core';
import { RadioGroupChild } from '../../directives';

@Component({
  selector: 'tim-radio-group-option',
  templateUrl: './radio-group-option.component.html',
  providers: [
    {
      provide: RadioGroupChild,
      // eslint-disable-next-line no-use-before-define
      useExisting: TimRadioGroupOptionComponent,
    },
  ],
})
export class TimRadioGroupOptionComponent<T = any> extends RadioGroupChild<T> {
  constructor() {
    super();
  }

  ngOnInit() {}

  onClick() {
    if (this.disabled) return;
    if (this.selected) return;
    this.emitCheckedChange(!this.selected);
  }
}
