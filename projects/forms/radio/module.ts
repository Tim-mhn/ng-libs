import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUIRadioGroupModule } from './components/radio-group/radio-group.module';
import { TimUIRadioGroupComponent } from './components/radio-group/radio-group.component';
import { TimUIRadioSubtextDirective } from './directives/radio-subtext.directive';
import { TimUIRadioButtonModule } from './components/radio-button/radio-button.module';
import { TimUIRadioButton } from './components/radio-button/radio-button.component';
import { TimUIRadioGroupOptionModule } from './components/radio-group-option/radio-group-option.module';
import { TimUIRadioGroupOptionComponent } from './components/radio-group-option/radio-group-option.component';

@NgModule({
  declarations: [TimUIRadioSubtextDirective],
  imports: [
    CommonModule,
    TimUIRadioButtonModule,
    TimUIRadioGroupModule,
    TimUIRadioGroupOptionModule,
  ],
  exports: [
    TimUIRadioButton,
    TimUIRadioGroupComponent,
    TimUIRadioSubtextDirective,
    TimUIRadioGroupOptionComponent,
  ],
})
export class TimUIRadioModule {}
