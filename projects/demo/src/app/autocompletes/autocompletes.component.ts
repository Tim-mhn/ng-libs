import { Component, OnInit } from '@angular/core';
import {
  NewTagMessageFn,
  TagTemplateBuilder,
} from '@tim-mhn/ng-forms/autocomplete';
import { TypedFormBuilder } from '@tim-mhn/common/typed-forms';

@Component({
  selector: 'demo-autocompletes',
  templateUrl: './autocompletes.component.html',
})
export class AutocompletesDemoComponent implements OnInit {
  constructor(private tfb: TypedFormBuilder) {}

  ngOnInit(): void {}
  onNewTagClicked = console.log;
  tagTemplate: TagTemplateBuilder = (text: string) =>
    `<span contentEditable="false" class="text-gray-800 border border-gray-200 rounded-md shadow-lg bg-gray-100">${text}</span> `;

  autocompleteSuggestions = ['hello', 'world', 'tim', 'tom'];

  form = this.tfb.group({
    inputSuggester: '',
    htmlInput: "<span style='color:blue'>HTML</span> input",
    editableHeaderInput: '',
  });
  customNewTagMessageFn: NewTagMessageFn = (newTag: string) =>
    `Create a tag of your own: "${newTag}"`;
}
