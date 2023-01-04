import { Directive } from '@angular/core';

@Directive({
  selector: 'tim-radio-subtext',
  host: {
    class: 'text-gray-500 text-sm font-normal',
  },
})
export class TimRadioSubtextDirective {
  constructor() {}
}
