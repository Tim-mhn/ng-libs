import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimBaseCheckbox } from './base-checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TimBaseCheckbox],
  exports: [TimBaseCheckbox],
})
export class TimBaseCheckboxModule {}
