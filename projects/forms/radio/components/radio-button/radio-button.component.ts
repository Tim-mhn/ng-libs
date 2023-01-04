import { Component } from '@angular/core';
import { RadioGroupChild } from '../../directives';

@Component({
  selector: 'tim-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: RadioGroupChild,
      // eslint-disable-next-line no-use-before-define
      useExisting: TimRadioButton,
    },
  ],
})
export class TimRadioButton<T = any> extends RadioGroupChild<T> {
  constructor() {
    super();
  }
}
