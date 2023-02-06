import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIDividerModule } from '@tim-mhn/ng-ui/divider';
import { TimDateModule } from '@tim-mhn/common/date';
import { TimFormsPipesModule } from '@tim-mhn/ng-forms/core';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TimCalendarDropdownComponent } from './components/calendar-dropdown/calendar-dropdown.component';
import { TimCalendarModule } from './components/calendar/calendar.module';
import { TimDateRangePickerComponent } from './date-range-picker.component';
import { TimDatePickerTriggerDirective } from './directives/date-picker-trigger.directive';

@NgModule({
  declarations: [
    TimDateRangePickerComponent,
    TimCalendarDropdownComponent,
    TimDatePickerTriggerDirective,
  ],
  imports: [
    CommonModule,
    TimInputModule,
    TimUIButtonModule,
    TimUICoreModule,
    TimUIDividerModule,
    TimCalendarModule,
    TimDateModule,
    OverlayModule,
    TimFormsPipesModule,
  ],
  exports: [TimDateRangePickerComponent],
})
export class DateRangePickerModule {}
