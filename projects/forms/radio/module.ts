import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimRadioGroupModule } from './components/radio-group/radio-group.module';
import { TimRadioGroupComponent } from './components/radio-group/radio-group.component';
import { TimRadioSubtextDirective } from './directives/radio-subtext.directive';
import { TimRadioButtonModule } from './components/radio-button/radio-button.module';
import { TimRadioButton } from './components/radio-button/radio-button.component';
import { TimRadioGroupOptionModule } from './components/radio-group-option/radio-group-option.module';
import { TimRadioGroupOptionComponent } from './components/radio-group-option/radio-group-option.component';

@NgModule({
  declarations: [TimRadioSubtextDirective],
  imports: [
    CommonModule,
    TimRadioButtonModule,
    TimRadioGroupModule,
    TimRadioGroupOptionModule,
  ],
  exports: [
    TimRadioButton,
    TimRadioGroupComponent,
    TimRadioSubtextDirective,
    TimRadioGroupOptionComponent,
  ],
})
export class TimRadioModule {}
