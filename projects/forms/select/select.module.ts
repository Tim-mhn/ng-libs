import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimUISelect } from './select.component';
import { TimUIOptionModule } from './components';
import { TimUIFormsPipesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [TimUISelect],
  imports: [
    CommonModule,
    OverlayModule,
    TimUIFormsPipesModule,
    TimUIOptionModule,
  ],
  exports: [TimUISelect, TimUIOptionModule],
})
export class TimUISelectModule {}
