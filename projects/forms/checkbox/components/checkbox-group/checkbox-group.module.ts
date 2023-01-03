import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUICheckboxGroupOptionComponent } from '../checkbox-group-option/checkbox-group-option.component';
import { TimUICheckboxGroupOptionModule } from '../checkbox-group-option/checkbox-group-option.module';
import { TimUICheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  declarations: [TimUICheckboxGroupComponent],
  imports: [CommonModule, TimUICheckboxGroupOptionModule],
  exports: [TimUICheckboxGroupComponent, TimUICheckboxGroupOptionComponent],
})
export class TimUICheckboxGroupModule {}
