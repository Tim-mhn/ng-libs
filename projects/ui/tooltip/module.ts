import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUITooltipContainerComponent } from './components/tooltip-container/tooltip-container.component';
import { TimUITooltip } from './directives/tooltip.directive';
import { TimUITooltipOrigin } from './directives/tooltip-origin.directive';

@NgModule({
  declarations: [
    TimUITooltip,
    TimUITooltipOrigin,
    TimUITooltipContainerComponent,
  ],
  imports: [CommonModule],
  exports: [TimUITooltip, TimUITooltipOrigin],
})
export class TimUITooltipModule {}
