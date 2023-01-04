import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DayCircleComponent } from './day-circle/day-circle.component';
import { IncludedInPipe } from './included-in.pipe';
import { TimDaysPickerComponent } from './picker/days-picker.component';

@NgModule({
  declarations: [TimDaysPickerComponent, DayCircleComponent, IncludedInPipe],
  imports: [CommonModule],
  exports: [TimDaysPickerComponent],
})
export class TimDaysPickerModule {}
