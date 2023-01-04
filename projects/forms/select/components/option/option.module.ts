import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimBaseCheckboxModule } from '@tim-mhn/ng-forms/checkbox';
import { SelectListItemModule } from '../list-item/list-item.module';
import { TimOption } from './option.component';

@NgModule({
  declarations: [TimOption],
  imports: [
    CommonModule,
    TimFormsDirectivesModule,
    TimBaseCheckboxModule,
    SelectListItemModule,
  ],
  exports: [TimOption, SelectListItemModule],
})
export class TimOptionModule {}
