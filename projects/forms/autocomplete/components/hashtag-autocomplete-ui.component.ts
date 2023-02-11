import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TagTemplateBuilder } from '../models';
import { TimHashtagOptionComponent } from './autocomplete-suggestion/autocomplete-suggestion.component';

export type SuggestionsFilterFn = (v: string, input: string) => boolean;

const DEFAULT_FILTER_FN: SuggestionsFilterFn = (v: string, input: string) => {
  if (!input) return true;
  return (v as any as string)?.toLowerCase().startsWith(input);
};
@Component({
  selector: 'tim-hashtag-autocomplete',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
})
export class TimHashtagAutocompleteUIComponent {
  @Input() tagTemplate: TagTemplateBuilder = (tag: string) => tag;

  @ViewChild(TemplateRef) private _templateRef: TemplateRef<any>;
  @ContentChildren(TimHashtagOptionComponent)
  private _suggestions: QueryList<TimHashtagOptionComponent>;

  suggestionsFilter: SuggestionsFilterFn = DEFAULT_FILTER_FN;

  public get templateRef() {
    return this._templateRef;
  }

  public get suggestions() {
    return this._suggestions;
  }
}
