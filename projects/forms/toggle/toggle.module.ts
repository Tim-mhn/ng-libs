import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimToggle } from './toggle.component';

@NgModule({
  declarations: [TimToggle],
  imports: [CommonModule],
  exports: [TimToggle],
})
export class TimToggleModule {}
