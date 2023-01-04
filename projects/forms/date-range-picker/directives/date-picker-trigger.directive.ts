import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { TimCalendarDropdownComponent } from '../components/calendar-dropdown/calendar-dropdown.component';

@Directive({
  selector: '[timDatePickerTrigger]',
  host: {
    '(click)': '_handleClick($event)',
    class: 'cursor-pointer',
  },
})
export class TimDatePickerTriggerDirective
  extends CdkOverlayOrigin
  implements OnChanges
{
  @Input() timCalendarDropdown: TimCalendarDropdownComponent;

  constructor(public el: ElementRef<HTMLElement>) {
    super(el);
  }

  ngOnChanges(): void {
    this.timCalendarDropdown.setTrigger(this);
  }

  _handleClick(event: MouseEvent) {
    event.stopPropagation();

    this._toggleCalendarDropDown();
  }

  _toggleCalendarDropDown() {
    if (this.timCalendarDropdown.isOpen) this.timCalendarDropdown.close();
    else this.timCalendarDropdown.open();
  }
}
