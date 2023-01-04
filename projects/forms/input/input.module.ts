import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimInput } from './input.component';

@NgModule({
  imports: [CommonModule, TimFormsDirectivesModule],
  declarations: [TimInput],
  exports: [TimInput, TimFormsDirectivesModule],
})
export class TimInputModule {}
