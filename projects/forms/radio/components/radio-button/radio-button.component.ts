import { Component } from '@angular/core';
import { RadioGroupChild } from '../../directives';

@Component({
  selector: 'iqair-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: RadioGroupChild,
      // eslint-disable-next-line no-use-before-define
      useExisting: TimUIRadioButton,
    },
  ],
})
export class TimUIRadioButton<T = any> extends RadioGroupChild<T> {
  constructor() {
    super();
  }
}
