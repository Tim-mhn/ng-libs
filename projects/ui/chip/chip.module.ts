import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIChip } from './components/chip/chip.component';
import { ChipClassPipe } from './pipes/chip-class.pipe';
import { TimIconChip } from './components/icon-chip/icon-chip.component';

@NgModule({
  declarations: [TimUIChip, ChipClassPipe, TimIconChip],
  imports: [CommonModule, TimUICoreModule],
  exports: [TimUIChip, TimUICoreModule, TimIconChip],
})
export class TimUIChipModule {}
