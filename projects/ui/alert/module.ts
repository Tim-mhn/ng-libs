import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIAlertTitle } from './directives/alert-title.directive';
import { TimUIAlert } from './components/alert/alert.component';
import { TimUIAlertAction } from './directives/alert-action.directive';
import { TimUIAlertDescription } from './directives/alert-description.directive';
import { AlertPipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [CommonModule, AlertPipesModule, TimUICoreModule],
  declarations: [
    TimUIAlert,
    TimUIAlertDescription,
    TimUIAlertAction,
    TimUIAlertTitle,
  ],
  exports: [
    TimUIAlert,
    TimUIAlertDescription,
    TimUIAlertAction,
    TimUIAlertTitle,
  ],
})
export class TimUIAlertModule {}
