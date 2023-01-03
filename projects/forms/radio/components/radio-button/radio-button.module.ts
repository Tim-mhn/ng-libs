import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseRadioButtonModule } from '../base-radio-button/base-radio-button.module';
import { TimUIRadioButton } from './radio-button.component';

@NgModule({
  declarations: [TimUIRadioButton],
  imports: [CommonModule, BaseRadioButtonModule],
  exports: [TimUIRadioButton],
})
export class TimUIRadioButtonModule {}
