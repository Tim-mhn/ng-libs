import { Directive } from '@angular/core';

@Directive({
  selector: 'iqair-radio-subtext',
  host: {
    class: 'text-gray-500 text-sm font-normal',
  },
})
export class TimUIRadioSubtextDirective {
  constructor() {}
}
