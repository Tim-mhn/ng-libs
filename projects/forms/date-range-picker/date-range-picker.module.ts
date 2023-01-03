import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIDividerModule } from '@tim-mhn/ng-ui/divider';
import { IQAirDateModule } from '@tim-mhn/common/date';
import { TimUIFormsPipesModule } from '@tim-mhn/ng-forms/core';
import { TimUIInputModule } from '@tim-mhn/ng-forms/input';
import { CalendarDropdownComponent } from './components/calendar-dropdown/calendar-dropdown.component';
import { TimUICalendarModule } from './components/calendar/calendar.module';
import { TimUIDateRangePickerComponent } from './date-range-picker.component';
import { TimUIDatePickerTriggerDirective } from './directives/iqair-date-picker-trigger.directive';

@NgModule({
  declarations: [
    TimUIDateRangePickerComponent,
    CalendarDropdownComponent,
    TimUIDatePickerTriggerDirective,
  ],
  imports: [
    CommonModule,
    TimUIInputModule,
    TimUIButtonModule,
    TimUICoreModule,
    TimUIDividerModule,
    TimUICalendarModule,
    IQAirDateModule,
    OverlayModule,
    TimUIFormsPipesModule,
  ],
  exports: [TimUIDateRangePickerComponent],
})
export class DateRangePickerModule {}
