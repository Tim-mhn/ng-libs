import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimUIInput } from './input.component';

@NgModule({
  imports: [CommonModule, TimUIFormsDirectivesModule],
  declarations: [TimUIInput],
  exports: [TimUIInput, TimUIFormsDirectivesModule],
})
export class TimUIInputModule {}
