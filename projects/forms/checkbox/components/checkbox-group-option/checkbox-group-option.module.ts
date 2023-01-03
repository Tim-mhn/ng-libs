import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIBaseCheckboxModule } from '../base-checkbox/base-checkbox.module';
import { TimUICheckboxGroupOptionComponent } from './checkbox-group-option.component';

@NgModule({
  declarations: [TimUICheckboxGroupOptionComponent],
  imports: [CommonModule, TimUIBaseCheckboxModule],
  exports: [TimUICheckboxGroupOptionComponent],
})
export class TimUICheckboxGroupOptionModule {}
