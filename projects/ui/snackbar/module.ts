import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUISpinnerModule } from '@tim-mhn/ng-ui/spinner';
import { SnackbarComponent } from './components/snackbar.component';
import { TimUISnackbar } from './services/snackbar.service';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, TimUICoreModule, TimUISpinnerModule],
  providers: [TimUISnackbar],
})
export class TimUISnackbarModule {}
