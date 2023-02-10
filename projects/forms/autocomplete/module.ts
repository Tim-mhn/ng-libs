import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimSuggestionsContainerComponent } from './components/suggestions-container/suggestions-container.component';
import { TimAutocompleteUIComponent } from './components/autocomplete-ui.component';
import { TimAutoCompleteDirective } from './directives/autocomplete.directive';
import { TimAutocompleteSuggestionComponent } from './components/autocomplete-suggestion/autocomplete-suggestion.component';
import { TimHtmlInput } from './components/html-input/html-input.component';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [
    TimAutoCompleteDirective,
    TimAutocompleteUIComponent,
    TimSuggestionsContainerComponent,
    TimAutocompleteSuggestionComponent,
    TimHtmlInput,
  ],
  imports: [CommonModule, TimFormsDirectivesModule],
  exports: [
    TimAutoCompleteDirective,
    TimAutocompleteUIComponent,
    TimAutocompleteSuggestionComponent,
    TimHtmlInput,
  ],
})
export class TimAutocompleteModule {}
