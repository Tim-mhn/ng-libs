import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditableHeaderInputComponent } from './editable-header-input.component';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimFormsPipesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [EditableHeaderInputComponent],
  imports: [CommonModule, TimFormsPipesModule, TimFormsDirectivesModule],
  exports: [EditableHeaderInputComponent],
})
export class TimEditableHeaderInputModule {}
