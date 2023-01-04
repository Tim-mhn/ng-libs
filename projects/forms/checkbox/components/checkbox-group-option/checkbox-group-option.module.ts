import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimBaseCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { TimCheckboxGroupOptionComponent } from './checkbox-group-option.component';

@NgModule({
  declarations: [TimCheckboxGroupOptionComponent],
  imports: [CommonModule, TimBaseCheckboxModule],
  exports: [TimCheckboxGroupOptionComponent],
})
export class TimCheckboxGroupOptionModule {}
