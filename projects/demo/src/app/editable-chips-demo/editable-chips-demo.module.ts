import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableChipsComponent } from './editable-chips-demo.component';
import { TimEditableChipModule } from '@tim-mhn/ng-forms/editable-chip';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditableChipsComponent],
  imports: [CommonModule, TimEditableChipModule, ReactiveFormsModule],
})
export class EditableChipsModule {}
