import { Component, OnInit } from '@angular/core';
import { Observable, share, Subject, tap } from 'rxjs';
import { TimAutocompleteSuggestionComponent } from '../autocomplete-suggestion/autocomplete-suggestion.component';

@Component({
  selector: 'tim-suggestions-container',
  templateUrl: './suggestions-container.component.html',
})
export class TimSuggestionsContainerComponent implements OnInit {
  constructor() {}

  private _createTag$ = new Subject<string>();
  public createTagClick$ = this._createTag$.asObservable();

  suggestions$: Observable<TimAutocompleteSuggestionComponent[]>;

  visible = true;

  tagInput$: Observable<string>;

  currentTagInput: string;
  public init(opts: {
    tagInput: Observable<string>;
    suggestions: Observable<TimAutocompleteSuggestionComponent[]>;
  }) {
    this.tagInput$ = opts.tagInput.pipe(
      tap((tag) => (this.currentTagInput = tag))
    );
    this.suggestions$ = opts.suggestions;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  createCustomTag() {
    console.log(this.currentTagInput);
    this._createTag$.next(this.currentTagInput);
  }

  ngOnInit(): void {}
}
