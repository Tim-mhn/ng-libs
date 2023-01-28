import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { TimUIChipModule } from '@tim-mhn/ng-ui/chip';

@NgModule({
  declarations: [ChipsComponent],
  imports: [CommonModule, TimUIChipModule],
})
export class ChipsModule {}
