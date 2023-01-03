import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIFormsPipesModule } from '@tim-mhn/ng-forms/core';
import { TimUIBaseCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { TimUICheckbox } from './checkbox.component';

@NgModule({
  imports: [CommonModule, TimUIBaseCheckboxModule, TimUIFormsPipesModule],
  declarations: [TimUICheckbox],
  exports: [TimUICheckbox],
})
export class TimUICheckboxComponentModule {}
