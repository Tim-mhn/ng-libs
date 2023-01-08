import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TimPasswordInputModule } from '@tim-mhn/ng-forms/password-input';
import { ReactiveFormsModule } from '@angular/forms';
import { TimInputFieldModule } from '@tim-mhn/ng-forms/input-field';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';

@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    TimInputModule,
    TimInputFieldModule,
    TimPasswordInputModule,
    ReactiveFormsModule,
  ],
})
export class InputsModule {}
