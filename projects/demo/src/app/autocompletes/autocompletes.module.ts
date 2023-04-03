import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompletesDemoComponent } from './autocompletes.component';
import { TimAutocompleteModule } from '@tim-mhn/ng-forms/autocomplete';
import { TimEditableHeaderInputModule } from '@tim-mhn/ng-forms/editable-header-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompletesDemoComponent],
  imports: [
    CommonModule,
    TimAutocompleteModule,
    TimEditableHeaderInputModule,
    ReactiveFormsModule,
  ],
})
export class AutocompletesDemoModule {}
