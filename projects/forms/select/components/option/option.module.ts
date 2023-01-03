import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { TimUIBaseCheckboxModule } from '@tim-mhn/ng-forms/checkbox';
import { SelectListItemModule } from '../list-item/list-item.module';
import { TimUIOption } from './option.component';

@NgModule({
  declarations: [TimUIOption],
  imports: [
    CommonModule,
    TimUIFormsDirectivesModule,
    TimUIBaseCheckboxModule,
    SelectListItemModule,
  ],
  exports: [TimUIOption, SelectListItemModule],
})
export class TimUIOptionModule {}
