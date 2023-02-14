import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TagTemplateBuilder } from '../../models';
import { TimHashtagAutoCompleteDirective } from '../../directives/hashtag-autocomplete.directive';
import { TimHashtagOptionComponent } from '../hashtag-option/hashtag-option.component';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { filterOptionsToShow } from '../../utils/filter-options-to-show.util';

export type NewTagMessageFn = (newTag: string) => string;

const DEFAULT_NEW_TAG_MESSAGE_FN = (newTag: string) => `Create tag "${newTag}"`;
@Component({
  selector: 'tim-hashtag-autocomplete',
  templateUrl: './hashtag-autocomplete.component.html',
})
export class TimHashtagAutocompleteComponent {
  @Input() tagTemplate: TagTemplateBuilder = (tag: string) => tag;
  @Input() newTagMessage: NewTagMessageFn = DEFAULT_NEW_TAG_MESSAGE_FN;

  @ContentChildren(TimHashtagOptionComponent)
  public suggestions: QueryList<TimHashtagOptionComponent>;

  @Output() newTag = new EventEmitter<string>();

  trigger: TimHashtagAutoCompleteDirective;

  newTagMessage$: Observable<string>;

  private _newTagClicked$ = new Subject<string>();
  public newTagClicked$ = this._newTagClicked$.asObservable();

  public setTrigger(trigger: TimHashtagAutoCompleteDirective) {
    this.trigger = trigger;
  }

  inputText$: BehaviorSubject<string>;
  public init(inputText: BehaviorSubject<string>) {
    this.inputText$ = inputText;
    this._buildSuggestionsToShow();
    this._buildNewTagMessage();
  }

  private _buildNewTagMessage() {
    this.newTagMessage$ = this.inputText$.pipe(
      map((newTag) => this.newTagMessage(newTag))
    );
  }

  suggestionsToShow$: Observable<TimHashtagOptionComponent[]>;
  private _buildSuggestionsToShow() {
    const allSuggestions$ = this.suggestions.changes.pipe(
      startWith(this.suggestions)
    ) as Observable<QueryList<TimHashtagOptionComponent>>;

    this.suggestionsToShow$ = combineLatest({
      suggestions: allSuggestions$,
      input: this.inputText$.pipe(startWith('')),
    }).pipe(
      map(({ suggestions, input }) => {
        return filterOptionsToShow(suggestions.toArray(), input);
      })
    );
  }

  show() {
    this.visible = true;
  }

  onTagSuggestionClick(tag: TimHashtagOptionComponent) {
    this.hide();
    tag.click();
  }

  onNewTagClicked() {
    this.hide();
    const currentInputText = this.inputText$.getValue();
    this.newTag.emit(currentInputText);
    this._newTagClicked$.next(this.inputText$.getValue());
  }

  hide() {
    this.visible = false;
  }

  visible = false;
}
