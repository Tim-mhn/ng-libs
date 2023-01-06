import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarsComponent } from './snackbars.component';
import { TimUISnackbarModule } from '@tim-mhn/ng-ui/snackbar';

@NgModule({
  declarations: [SnackbarsComponent],
  imports: [CommonModule, TimUISnackbarModule],
})
export class SnackbarsModule {}
