import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimBaseCheckboxModule } from '@tim-mhn/ng-forms/checkbox';
import { SelectListItemComponent } from './list-item.component';

@NgModule({
  declarations: [SelectListItemComponent],
  imports: [CommonModule, TimBaseCheckboxModule],
  exports: [SelectListItemComponent],
})
export class SelectListItemModule {}
