import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseRadioButtonModule } from '../base-radio-button/base-radio-button.module';
import { TimRadioButton } from './radio-button.component';

@NgModule({
  declarations: [TimRadioButton],
  imports: [CommonModule, BaseRadioButtonModule],
  exports: [TimRadioButton],
})
export class TimRadioButtonModule {}
