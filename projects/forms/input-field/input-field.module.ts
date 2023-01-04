import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TimInputHint,
  TimInputLabel,
  TimFormsPipesModule,
  TimFormsDirectivesModule,
} from '@tim-mhn/ng-forms/core';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TimInputField } from './input-field.component';

@NgModule({
  imports: [
    CommonModule,
    TimInputModule,
    TimFormsPipesModule,
    TimFormsDirectivesModule,
  ],
  declarations: [TimInputField],
  exports: [TimInputField, TimInputHint, TimInputLabel],
})
export class TimInputFieldModule {}
