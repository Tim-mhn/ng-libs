import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimUITimeInputComponent } from './components/time-input/time-input.component';
import { TimUITimePeriodInputComponent } from './components/time-period-input/time-period-input.component';
import { TimUITimeRangeInputComponent } from './components/time-range-input/time-range-input.component';
import { ValidTimePipe } from './pipes/valid-time.pipe';
import { TimUIStartTimeDirective } from './directives/start-time.directive';
import { TimUIEndTimeDirective } from './directives/end-time.directive';
import { TimUITimeRangeAllDayDirective } from './directives/time-range-all-day.directive';
import { TimUIConnectedTimeRangeAllDayInputsComponent } from './components/connected-time-range-all-day-inputs/connected-time-range-all-day-inputs.component';

@NgModule({
  declarations: [
    TimUITimeInputComponent,
    TimUITimePeriodInputComponent,
    TimUITimeRangeInputComponent,
    ValidTimePipe,
    TimUIStartTimeDirective,
    TimUIEndTimeDirective,
    TimUIConnectedTimeRangeAllDayInputsComponent,
    TimUITimeRangeAllDayDirective,
  ],
  imports: [CommonModule, TimUIFormsDirectivesModule],
  exports: [
    TimUITimeInputComponent,
    TimUITimeRangeInputComponent,
    TimUIStartTimeDirective,
    TimUIEndTimeDirective,
    TimUIConnectedTimeRangeAllDayInputsComponent,
    TimUITimeRangeAllDayDirective,
  ],
})
export class TimUITimeInputModule {}
