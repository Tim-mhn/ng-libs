import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { CalendarDropdownComponent } from '../components/calendar-dropdown/calendar-dropdown.component';

@Directive({
  selector: '[iqairDatePickerTrigger]',
  host: {
    '(click)': '_handleClick($event)',
    class: 'cursor-pointer',
  },
})
export class TimUIDatePickerTriggerDirective
  extends CdkOverlayOrigin
  implements OnChanges
{
  @Input() iqairCalendarDropdown: CalendarDropdownComponent;

  constructor(public el: ElementRef<HTMLElement>) {
    super(el);
  }

  ngOnChanges(): void {
    this.iqairCalendarDropdown.setTrigger(this);
  }

  _handleClick(event: MouseEvent) {
    event.stopPropagation();

    this._toggleCalendarDropDown();
  }

  _toggleCalendarDropDown() {
    if (this.iqairCalendarDropdown.isOpen) this.iqairCalendarDropdown.close();
    else this.iqairCalendarDropdown.open();
  }
}
