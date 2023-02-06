import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { TimeOfDayLabelPipe } from './pipes/time-of-day-label.pipe';

@NgModule({
  declarations: [TimeOfDayLabelPipe, DateTimeFormatPipe],
  providers: [TimeOfDayLabelPipe, DateTimeFormatPipe],
  exports: [TimeOfDayLabelPipe, DateTimeFormatPipe],
})
export class TimDateModule {}
