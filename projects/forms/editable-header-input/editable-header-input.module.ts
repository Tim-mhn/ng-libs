import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditableHeaderInputComponent } from './editable-header-input.component';
import { TimUIFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimUIFormsPipesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [EditableHeaderInputComponent],
  imports: [CommonModule, TimUIFormsPipesModule, TimUIFormsDirectivesModule],
  exports: [EditableHeaderInputComponent],
})
export class TimUIEditableHeaderInputModule {}
