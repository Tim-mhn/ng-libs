import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIInputModule } from '@tim-mhn/ng-forms/input';
import { TimUIPasswordInput } from './password-input.component';

@NgModule({
  imports: [CommonModule, TimUIInputModule],
  declarations: [TimUIPasswordInput],
  exports: [TimUIPasswordInput],
})
export class TimUIPasswordInputModule {}
