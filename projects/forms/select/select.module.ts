import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimSelect } from './select.component';
import { TimOptionModule } from './components';
import { TimFormsPipesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [TimSelect],
  imports: [CommonModule, OverlayModule, TimFormsPipesModule, TimOptionModule],
  exports: [TimSelect, TimOptionModule],
})
export class TimSelectModule {}
