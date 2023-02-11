import { Component, OnInit } from '@angular/core';
import { Observable, share, Subject, tap } from 'rxjs';
import { TimHashtagOptionComponent } from '../autocomplete-suggestion/autocomplete-suggestion.component';

@Component({
  selector: 'tim-suggestions-container',
  templateUrl: './suggestions-container.component.html',
})
export class TimHashtagOptionComponentsContainer implements OnInit {
  constructor() {}

  private _createTag$ = new Subject<string>();
  public createTagClick$ = this._createTag$.asObservable();

  suggestions$: Observable<TimHashtagOptionComponent[]>;

  visible = true;

  tagInput$: Observable<string>;

  currentTagInput: string;
  public init(opts: {
    tagInput: Observable<string>;
    suggestions: Observable<TimHashtagOptionComponent[]>;
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

  onTagSuggestionClick(tag: TimHashtagOptionComponent) {
    this.hide();
    tag.click();
  }

  createCustomTag() {
    this.hide();
    this._createTag$.next(this.currentTagInput);
  }

  ngOnInit(): void {}
}
