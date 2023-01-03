import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIBaseCheckboxModule } from './components/base-checkbox/base-checkbox.module';
import { TimUICheckboxGroupModule } from './components/checkbox-group/checkbox-group.module';
import { TimUICheckboxComponentModule } from './components/checkbox/checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    TimUIBaseCheckboxModule,
    TimUICheckboxGroupModule,
    TimUICheckboxComponentModule,
  ],
  exports: [
    TimUIBaseCheckboxModule,
    TimUICheckboxGroupModule,
    TimUICheckboxComponentModule,
  ],
})
export class TimUICheckboxModule {}
