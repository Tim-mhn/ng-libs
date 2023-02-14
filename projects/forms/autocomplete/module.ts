import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimHashtagAutoCompleteDirective } from './directives/hashtag-autocomplete.directive';
import { TimHashtagOptionComponent } from './components/hashtag-option/hashtag-option.component';
import { TimHtmlInput } from './components/html-input/html-input.component';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimHashtagAutocompleteComponent } from './components/hashtag-autocomplete/hashtag-autocomplete.component';

@NgModule({
  declarations: [
    TimHashtagAutoCompleteDirective,
    TimHashtagAutocompleteComponent,
    TimHashtagOptionComponent,
    TimHtmlInput,
  ],
  imports: [CommonModule, TimFormsDirectivesModule, OverlayModule],
  exports: [
    TimHashtagAutoCompleteDirective,
    TimHashtagAutocompleteComponent,
    TimHashtagOptionComponent,
    TimHtmlInput,
  ],
})
export class TimAutocompleteModule {}
