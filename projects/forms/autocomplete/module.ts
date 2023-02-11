import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimHashtagOptionComponentsContainer } from './components/suggestions-container/suggestions-container.component';
import { TimHashtagAutocompleteUIComponent } from './components/hashtag-autocomplete-ui.component';
import { TimHashtagAutoCompleteDirective } from './directives/hashtag-autocomplete.directive';
import { TimHashtagOptionComponent } from './components/autocomplete-suggestion/autocomplete-suggestion.component';
import { TimHtmlInput } from './components/html-input/html-input.component';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [
    TimHashtagAutoCompleteDirective,
    TimHashtagAutocompleteUIComponent,
    TimHashtagOptionComponentsContainer,
    TimHashtagOptionComponent,
    TimHtmlInput,
  ],
  imports: [CommonModule, TimFormsDirectivesModule],
  exports: [
    TimHashtagAutoCompleteDirective,
    TimHashtagAutocompleteUIComponent,
    TimHashtagOptionComponent,
    TimHtmlInput,
  ],
})
export class TimAutocompleteModule {}
