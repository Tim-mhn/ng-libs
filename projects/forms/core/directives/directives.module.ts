import { NgModule } from '@angular/core';
import { TimUIInputHint } from './input-hint.directive';
import { TimUIInputLabel } from './label.directive';
import { TimUIPrefix } from './prefix.directive';
import { TimUISuffix } from './suffix.directive';
import { ContentEditableIfDirective } from './content-editable-if.directive';
import { ContentEditableFitWidthDirective } from './content-editable-fit-width.directive';
import { ContentEditableMaxLengthDirective } from './content-editable-max-length.directive';
import { ContentEditablePlaceholderDirective } from './content-editable-placeholder.directive';
import { ConnectedSubmitFormGroupDirective } from './connected-submit-form-group.directive';
import { ScrollToFirstInvalidControlOnSubmitDirective } from './scroll-to-first-invalid-control-on-submit.directive';
import { ScrollableToControlDirective } from './scrollable-to-control.directive';

@NgModule({
  declarations: [
    TimUIPrefix,
    TimUISuffix,
    TimUIInputLabel,
    TimUIInputHint,
    ContentEditableIfDirective,
    ContentEditableFitWidthDirective,
    ContentEditableMaxLengthDirective,
    ContentEditablePlaceholderDirective,
    ConnectedSubmitFormGroupDirective,
    ScrollToFirstInvalidControlOnSubmitDirective,
    ScrollableToControlDirective,
  ],
  imports: [],
  exports: [
    TimUIPrefix,
    TimUISuffix,
    TimUIInputLabel,
    TimUIInputHint,
    ContentEditableIfDirective,
    ContentEditableFitWidthDirective,
    ContentEditableMaxLengthDirective,
    ContentEditablePlaceholderDirective,
    ConnectedSubmitFormGroupDirective,
    ScrollToFirstInvalidControlOnSubmitDirective,
    ScrollableToControlDirective,
  ],
})
export class TimUIFormsDirectivesModule {}
