import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TimUIInputHint,
  TimUIInputLabel,
  TimUIFormsPipesModule,
  TimUIFormsDirectivesModule,
} from '@tim-mhn/ng-forms/core';
import { TimUIInputModule } from '@tim-mhn/ng-forms/input';
import { TimUIInputField } from './input-field.component';

@NgModule({
  imports: [
    CommonModule,
    TimUIInputModule,
    TimUIFormsPipesModule,
    TimUIFormsDirectivesModule,
  ],
  declarations: [TimUIInputField],
  exports: [TimUIInputField, TimUIInputHint, TimUIInputLabel],
})
export class TimUIInputFieldModule {}
