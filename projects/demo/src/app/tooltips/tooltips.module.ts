import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipsComponent } from './tooltips.component';
import { TimUITooltipModule } from '@tim-mhn/ng-ui/tooltip';

@NgModule({
  declarations: [TooltipsComponent],
  imports: [CommonModule, TimUITooltipModule],
})
export class TooltipsModule {}
