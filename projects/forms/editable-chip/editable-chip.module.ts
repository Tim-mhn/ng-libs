import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimEditableChip } from './editable-chip.component';
import { TimUIChipModule } from '@tim-mhn/ng-ui/chip';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimEditableChip],
  imports: [
    CommonModule,
    TimUIChipModule,
    TimInputModule,
    TypedFormsModule,
    ReactiveFormsModule,
  ],
  exports: [TimEditableChip],
})
export class TimEditableChipModule {}
