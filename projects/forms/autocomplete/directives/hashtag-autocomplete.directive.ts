import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { Key } from '@tim-mhn/common/keyboard';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { TextInput, TEXT_INPUT_TOKEN } from '@tim-mhn/ng-forms/core';

import { TimHashtagAutocompleteComponent } from '../components/hashtag-autocomplete/hashtag-autocomplete.component';
import { HASH_TAG } from '../constants/hash-tag.constant';
import { TimHashtagOption } from '../models/suggestion';
import { TimHashtagOptionComponent } from '../components/hashtag-option/hashtag-option.component';
import { buildTextAfterSuggestionInsertion } from '../utils/build-text-after-suggestion-insertion.util';
import { filterOptionsToShow } from '../utils/filter-options-to-show.util';

@Directive({
  selector: '[timHashtagAutocomplete]',
})
export class TimHashtagAutoCompleteDirective
  extends CdkOverlayOrigin
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Inject(TEXT_INPUT_TOKEN) public input: TextInput
  ) {
    super(elementRef);
  }

  @Input('timHashtagAutocomplete')
  autocomplete: TimHashtagAutocompleteComponent;

  @Output()
  optionClicked = new EventEmitter<void>();

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.setAllSuggestions();
    this._initContainer();
    this._updateInputValueOnSuggestionClick();
    this._emitInitialEmptyTagInput();
  }

  ngOnChanges() {
    this.autocomplete?.setTrigger(this);
  }

  subs = new Subscription();

  ngAfterViewInit() {
    this.subs.add(this.input.escaped$?.subscribe(() => this._resetTagText()));
  }

  show() {
    this.autocomplete.show();
  }

  private _updateInputValueOnSuggestionClick() {
    const suggestionClicked$: Observable<TimHashtagOption> =
      this.allSuggestions$.pipe(
        switchMap((suggestions) => merge(...suggestions.map((s) => s.clicked$)))
      );

    const createTagClick$: Observable<TimHashtagOption> =
      this.autocomplete.newTagClicked$.pipe(
        map((tag) => ({ value: tag, new: true }))
      );

    const tagClickedWithTemplate$ = merge(
      suggestionClicked$,
      createTagClick$
    ).pipe(
      map((suggestion) => ({
        ...suggestion,
        value: this.autocomplete.tagTemplate(suggestion.value),
      })),
      tap(() => this._resetTagText()),
      tap(() => this.optionClicked.emit())
    );

    const sub = tagClickedWithTemplate$.subscribe((clickedSuggestion) => {
      const inputNewText = buildTextAfterSuggestionInsertion(
        this.input.value,
        clickedSuggestion
      );
      this.input.updateFormValueAndUI(inputNewText);
      this.input.focusInput();
    });

    this.subs.add(sub);
  }

  private _emitInitialEmptyTagInput() {
    this._tagText = '';
    this.tagInput$.next(this._tagText);
  }

  allSuggestions$: Observable<QueryList<TimHashtagOptionComponent>>;

  setAllSuggestions() {
    this.allSuggestions$ = this.autocomplete.suggestions.changes.pipe(
      startWith(this.autocomplete.suggestions)
    ) as Observable<QueryList<TimHashtagOptionComponent>>;
  }

  private _initContainer() {
    this.autocomplete.init(this.tagInput$);
  }
  buildSuggestionsObservable() {
    return combineLatest({
      suggestions: this.allSuggestions$,
      input: this.tagInput$,
    }).pipe(
      map(({ suggestions, input }) => {
        return filterOptionsToShow(suggestions.toArray(), input);
      })
    );
  }

  private tagInput$ = new BehaviorSubject<string>('');

  private _tagText = '';
  public get tagText() {
    return this._tagText;
  }

  private _resetTagText() {
    this._tagText = '';
    this._emitTagInput();
  }

  @HostListener('input', ['$event'])
  onInput(e: InputEvent) {
    if (this.autocomplete?.visible) this._appendTagText(e?.data);

    if (e?.data === HASH_TAG) this.toggleSuggestions();
    else if (e?.data === ' ') this.hide();
  }

  @HostListener('document:click')
  hideSuggestionsOnClick() {
    this.hide();
  }

  hide() {
    this._resetTagText();
    this.autocomplete?.hide();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key == Key.Backspace) {
      this.removeCharFromTagText();
      if (this._tagText == '') this.autocomplete.hide();
    }
  }

  removeCharFromTagText() {
    this._tagText = this._tagText.slice(0, this._tagText?.length - 1);
    this._emitTagInput();
  }

  @HostListener('document:keydown', ['$event'])
  hideSuggestionsOnEscape(e: KeyboardEvent) {
    if (e.key == Key.Escape) this.hide();
  }

  private _appendTagText(char: string) {
    if (!char) return;
    this._tagText += char;
    this._emitTagInput();
  }

  private _emitTagInput() {
    this.tagInput$.next(this._tagText);
  }

  toggleSuggestions() {
    if (this.autocomplete?.visible) this.hide();
    else this.show();
  }

  ngOnDestroy() {
    this.hide();
    this.subs?.unsubscribe();
  }
}
