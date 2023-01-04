import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TimPasswordInput } from './password-input.component';

@NgModule({
  imports: [CommonModule, TimInputModule],
  declarations: [TimPasswordInput],
  exports: [TimPasswordInput],
})
export class TimPasswordInputModule {}
