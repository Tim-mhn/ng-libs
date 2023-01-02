import { TimUIDialogModule } from './module';
import { TimUIDialogService } from './services/dialog.service';
import { TimUIDialogRef } from './entities/dialog-ref';
import { IQAIR_DIALOG_DATA } from './providers/dialog-data';
import { TimUIDialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import {
  TimUICloseDialogButtonDirective,
  SimpleDialogActionsDirective,
  SimpleDialogDescriptionDirective,
  SimpleDialogTitleDirective,
} from './directives';

export {
  TimUIDialogModule,
  TimUIDialogService,
  TimUICloseDialogButtonDirective,
  TimUIDialogRef,
  TimUIDialogFooterComponent,
  IQAIR_DIALOG_DATA,
  SimpleDialogComponent,
  SimpleDialogTitleDirective,
  SimpleDialogDescriptionDirective,
  SimpleDialogActionsDirective,
};
