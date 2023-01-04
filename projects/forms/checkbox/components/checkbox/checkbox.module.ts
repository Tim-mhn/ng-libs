import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimFormsPipesModule } from '@tim-mhn/ng-forms/core';
import { TimBaseCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { TimCheckbox } from './checkbox.component';

@NgModule({
  imports: [CommonModule, TimBaseCheckboxModule, TimFormsPipesModule],
  declarations: [TimCheckbox],
  exports: [TimCheckbox],
})
export class TimCheckboxComponentModule {}
