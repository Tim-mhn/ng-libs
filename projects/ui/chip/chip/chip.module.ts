import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIChip } from './chip.component';
import { ChipClassPipe } from '../pipes/chip-class.pipe';

@NgModule({
  declarations: [TimUIChip, ChipClassPipe],
  imports: [CommonModule, TimUICoreModule],
  exports: [TimUIChip, TimUICoreModule],
})
export class TimUIChipModule {}
