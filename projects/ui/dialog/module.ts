import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIDividerModule } from '@tim-mhn/ng-ui/divider';
import { TimUIDialogService } from './services/dialog.service';
import { DefaultDialogContainerComponent } from './components/default-dialog-container/default-dialog-container.component';
import { FullScreenDialogContainerComponent } from './components/full-screen-dialog-container/full-screen-dialog-container.component';
import { TimUIDialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import {
  TimUICloseDialogButtonDirective,
  SimpleDialogTitleDirective,
  SimpleDialogDescriptionDirective,
  SimpleDialogActionsDirective,
} from './directives';

@NgModule({
  declarations: [
    DefaultDialogContainerComponent,
    FullScreenDialogContainerComponent,
    TimUICloseDialogButtonDirective,
    TimUIDialogFooterComponent,
    SimpleDialogComponent,
    SimpleDialogTitleDirective,
    SimpleDialogDescriptionDirective,
    SimpleDialogActionsDirective,
  ],
  imports: [CommonModule, TimUICoreModule, OverlayModule, TimUIDividerModule],
  providers: [TimUIDialogService],
  exports: [
    TimUICloseDialogButtonDirective,
    TimUIDialogFooterComponent,
    SimpleDialogComponent,
    SimpleDialogTitleDirective,
    SimpleDialogDescriptionDirective,
    SimpleDialogActionsDirective,
  ],
})
export class TimUIDialogModule {}
