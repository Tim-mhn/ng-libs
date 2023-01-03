import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimUICheckboxModule } from './components/checkbox/module';
import { TimUIInputField } from './components/input-field/input-field.component';
import { TimUIInputFieldModule } from './components/input-field/input-field.module';
import { TimUIInput } from './components/input/input.component';
import { TimUIInputModule } from './components/input/input.module';
import { TimUIOptionModule } from './components/select/components/option/option.module';
import { TimUIPasswordInput } from './components/password-input/password-input.component';
import { TimUIPasswordInputModule } from './components/password-input/password-input.module';
import { TimUISelectModule } from './components/select/select.module';
import { TimUIInputHint } from './directives/input-hint.directive';
import { TimUIInputLabel } from './directives/label.directive';
import { TimUIPrefix } from './directives/prefix.directive';
import { TimUISuffix } from './directives/suffix.directive';
import { TimUIFormsDirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimUIInputModule,
    TimUIInputFieldModule,
    TimUIPasswordInputModule,
    TimUISelectModule,
    TimUIOptionModule,
    TimUICheckboxModule,
    TimUIFormsDirectivesModule,
  ],
  declarations: [],
  providers: [],
  exports: [
    TimUIInputField,
    TimUIInputLabel,
    TimUIInputHint,
    TimUIInput,
    TimUIPrefix,
    TimUISuffix,
    TimUIPasswordInput,
    TimUISelectModule,
    TimUIOptionModule,
    TimUICheckboxModule,
    ReactiveFormsModule,
    TimUIFormsDirectivesModule,
  ],
})
export class TimUIFormsModule {}
