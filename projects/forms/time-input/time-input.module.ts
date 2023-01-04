import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimTimeInputComponent } from './components/time-input/time-input.component';
import { TimTimePeriodInputComponent } from './components/time-period-input/time-period-input.component';
import { TimTimeRangeInputComponent } from './components/time-range-input/time-range-input.component';
import { ValidTimePipe } from './pipes/valid-time.pipe';
import { TimStartTimeDirective } from './directives/start-time.directive';
import { TimEndTimeDirective } from './directives/end-time.directive';
import { TimTimeRangeAllDayDirective } from './directives/time-range-all-day.directive';
import { TimConnectedTimeRangeAllDayInputsComponent } from './components/connected-time-range-all-day-inputs/connected-time-range-all-day-inputs.component';

@NgModule({
  declarations: [
    TimTimeInputComponent,
    TimTimePeriodInputComponent,
    TimTimeRangeInputComponent,
    ValidTimePipe,
    TimStartTimeDirective,
    TimEndTimeDirective,
    TimConnectedTimeRangeAllDayInputsComponent,
    TimTimeRangeAllDayDirective,
  ],
  imports: [CommonModule, TimFormsDirectivesModule],
  exports: [
    TimTimeInputComponent,
    TimTimeRangeInputComponent,
    TimStartTimeDirective,
    TimEndTimeDirective,
    TimConnectedTimeRangeAllDayInputsComponent,
    TimTimeRangeAllDayDirective,
  ],
})
export class TimTimeInputModule {}
