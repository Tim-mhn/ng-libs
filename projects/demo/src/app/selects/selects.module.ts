import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectsComponent } from './selects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimSelectModule } from '@tim-mhn/ng-forms/select';

@NgModule({
  declarations: [SelectsComponent],
  imports: [CommonModule, ReactiveFormsModule, TimSelectModule],
  exports: [SelectsComponent],
})
export class SelectsModule {}
