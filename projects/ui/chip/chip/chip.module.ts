import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIChipComponent } from './chip.component';
import { ChipClassPipe } from '../pipes/chip-class.pipe';

@NgModule({
  declarations: [TimUIChipComponent, ChipClassPipe],
  imports: [CommonModule, TimUICoreModule],
  exports: [TimUIChipComponent, TimUICoreModule],
})
export class TimUIChipModule {}
