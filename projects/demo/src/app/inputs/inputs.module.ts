import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { TimInputModule } from '@tim-mhn/ng-forms/input';
import { TimPasswordInputModule } from '@tim-mhn/ng-forms/password-input';
import { ReactiveFormsModule } from '@angular/forms';
import { TimInputFieldModule } from '@tim-mhn/ng-forms/input-field';
import { TypedFormsModule } from '@tim-mhn/common/typed-forms';
import { TimAutocompleteModule } from '@tim-mhn/ng-forms/autocomplete';

@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    TimInputModule,
    TimInputFieldModule,
    TimAutocompleteModule,
    TimPasswordInputModule,
    ReactiveFormsModule,
    TypedFormsModule,
  ],
})
export class InputsModule {}
