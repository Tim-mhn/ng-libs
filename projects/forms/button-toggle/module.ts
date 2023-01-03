import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';

@NgModule({
  declarations: [ButtonToggleComponent, ButtonToggleGroupComponent],
  imports: [CommonModule],
  exports: [ButtonToggleComponent, ButtonToggleGroupComponent],
})
export class TimUIButtonToggleModule {}
