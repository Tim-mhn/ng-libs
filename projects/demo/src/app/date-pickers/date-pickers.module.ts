import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickersComponent } from './date-pickers.component';
import { DateRangePickerModule } from '@tim-mhn/ng-forms/date-range-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';

@NgModule({
  declarations: [DatePickersComponent],
  imports: [
    CommonModule,
    DateRangePickerModule,
    ReactiveFormsModule,
    TypedFormsModule,
  ],
  exports: [DatePickersComponent],
})
export class DatePickersModule {}
