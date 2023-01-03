import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIBaseCheckbox } from './base-checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TimUIBaseCheckbox],
  exports: [TimUIBaseCheckbox],
})
export class TimUIBaseCheckboxModule {}
