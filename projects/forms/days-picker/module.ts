import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DayCircleComponent } from './day-circle/day-circle.component';
import { IncludedInPipe } from './included-in.pipe';
import { TimUIDaysPickerComponent } from './picker/days-picker.component';

@NgModule({
  declarations: [TimUIDaysPickerComponent, DayCircleComponent, IncludedInPipe],
  imports: [CommonModule],
  exports: [TimUIDaysPickerComponent],
})
export class TimUIDaysPickerModule {}
