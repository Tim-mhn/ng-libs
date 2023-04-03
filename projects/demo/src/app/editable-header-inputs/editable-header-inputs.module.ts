import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableHeaderInputsDemoComponent } from './editable-header-inputs.component';
import { TimEditableHeaderInputModule } from '@tim-mhn/ng-forms/editable-header-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditableHeaderInputsDemoComponent],
  imports: [CommonModule, TimEditableHeaderInputModule, ReactiveFormsModule],
})
export class EditableHeaderInputsDemoModule {}
