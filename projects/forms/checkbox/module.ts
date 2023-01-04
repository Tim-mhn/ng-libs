import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimBaseCheckboxModule } from './components/base-checkbox/base-checkbox.module';
import { TimCheckboxGroupModule } from './components/checkbox-group/checkbox-group.module';
import { TimCheckboxComponentModule } from './components/checkbox/checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    TimBaseCheckboxModule,
    TimCheckboxGroupModule,
    TimCheckboxComponentModule,
  ],
  exports: [
    TimBaseCheckboxModule,
    TimCheckboxGroupModule,
    TimCheckboxComponentModule,
  ],
})
export class TimCheckboxModule {}
