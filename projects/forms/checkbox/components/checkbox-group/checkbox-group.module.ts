import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimCheckboxGroupOptionComponent } from '../checkbox-group-option/checkbox-group-option.component';
import { TimCheckboxGroupOptionModule } from '../checkbox-group-option/checkbox-group-option.module';
import { TimCheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  declarations: [TimCheckboxGroupComponent],
  imports: [CommonModule, TimCheckboxGroupOptionModule],
  exports: [TimCheckboxGroupComponent, TimCheckboxGroupOptionComponent],
})
export class TimCheckboxGroupModule {}
