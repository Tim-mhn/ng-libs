import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SliderComponent],
})
export class TimUISliderModule {}
