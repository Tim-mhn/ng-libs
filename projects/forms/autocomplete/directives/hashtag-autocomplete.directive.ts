import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { Key } from '@tim-mhn/common/keyboard';
import {
  combineLatest,
  map,
  merge,
  Observable,
  ReplaySubject,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { TimHashtagAutocompleteUIComponent } from '../components/hashtag-autocomplete-ui.component';
import { TimHtmlInput } from '../components/html-input/html-input.component';
import { TimHashtagOptionComponentsContainer } from '../components/suggestions-container/suggestions-container.component';
import { HASH_TAG } from '../constants/hash-tag.constant';
import { TimHashtagOption } from '../models/suggestion';
import { TimHashtagOptionComponent } from '../components/autocomplete-suggestion/autocomplete-suggestion.component';
import { buildTextAfterSuggestionInsertion } from '../utils/build-text-after-suggestion-insertion.util';

@Directive({
  selector: 'tim-html-input[timHashtagAutocomplete]',
})
export class TimHashtagAutoCompleteDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    public elementRef: ElementRef<TimHtmlInput>,
    public input: TimHtmlInput,
    private _overlay: Overlay
  ) {}

  @Input('timHashtagAutocomplete')
  autocomplete: TimHashtagAutocompleteUIComponent;

  container: TimHashtagOptionComponentsContainer;
  ngOnInit(): void {}

  subs = new Subscription();

  ngAfterViewInit() {
    this.subs.add(this.input.escaped$.subscribe(() => this.hide()));
  }

  show() {
    if (this.container) {
      this.container.show();
      return;
    }

    this._buildContainerWithOverlay();
    this.setAllSuggestions();
    this._initContainer();
    this._updateInputValueOnSuggestionClick();

    this._emitInitialEmptyTagInput();
    /** 1. merge clickSuggestion.click$
     * 2. onclick:
     * - 2.a. get new value # value
     * - 2.b. input.setValue
     */
  }

  private _updateInputValueOnSuggestionClick() {
    const suggestionClicked$: Observable<TimHashtagOption> =
      this.allSuggestions$.pipe(
        switchMap((suggestions) => merge(...suggestions.map((s) => s.clicked$)))
      );

    const createTagClick$: Observable<TimHashtagOption> =
      this.container.createTagClick$.pipe(
        map((tagText) => ({ value: tagText }))
      );

    const tagClickedWithTemplate$ = merge(
      suggestionClicked$,
      createTagClick$
    ).pipe(
      map((suggestion) => ({
        value: this.autocomplete.tagTemplate(suggestion.value),
      }))
    );

    tagClickedWithTemplate$.subscribe((clickedSuggestion) => {
      const inputNewText = buildTextAfterSuggestionInsertion(
        this.input.value,
        clickedSuggestion
      );
      this.input.updateFormValueAndUI(inputNewText);
      this.input.focusInput();
    });
  }

  private _buildContainerWithOverlay() {
    const containerPortal =
      new ComponentPortal<TimHashtagOptionComponentsContainer>(
        TimHashtagOptionComponentsContainer
      );
    this._createOverlay();
    const containerRef = this._overlayRef.attach(containerPortal);
    this.container = containerRef.instance;
  }

  private _emitInitialEmptyTagInput() {
    this.tagText = '';
    this.tagInput$.next(this.tagText);
  }

  allSuggestions$: Observable<QueryList<TimHashtagOptionComponent>>;

  setAllSuggestions() {
    this.allSuggestions$ = this.autocomplete.suggestions.changes.pipe(
      startWith(this.autocomplete.suggestions)
    ) as Observable<QueryList<TimHashtagOptionComponent>>;
  }

  private _initContainer() {
    const suggestion$ = this.buildSuggestionsObservable();
    this.container.init({
      suggestions: suggestion$,
      tagInput: this.tagInput$,
    });
  }
  buildSuggestionsObservable() {
    return combineLatest({
      suggestions: this.allSuggestions$,
      input: this.tagInput$,
    }).pipe(
      map(({ suggestions, input }) => {
        return suggestions.filter((sugg) =>
          this.autocomplete.suggestionsFilter(sugg.value, input)
        );
      })
    );
  }

  private tagInput$ = new ReplaySubject<string>();

  private tagText = '';
  hide() {
    this._resetTagText();
    if (!this.container) return;
    this.container.hide();
  }

  private _resetTagText() {
    this.tagText = '';
    this._emitTagInput();
  }

  private _overlayRef: OverlayRef;
  private _createOverlay() {
    const overlayConf = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.close(),
    });
    this._overlayRef = this._overlay.create(overlayConf);
  }

  @HostListener('input', ['$event'])
  onInput(e: InputEvent) {
    if (this.container?.visible) this._appendTagText(e?.data);

    if (e?.data === HASH_TAG) this.toggleSuggestions();
    else if (e?.data === ' ') this.hide();
  }

  @HostListener('document:click')
  hideSuggestionsOnClick() {
    this.hide();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key == Key.Backspace) this.removeCharFromTagText();
  }

  removeCharFromTagText() {
    this.tagText = this.tagText.slice(0, this.tagText?.length - 1);
    this._emitTagInput();
  }

  @HostListener('document:keydown', ['$event'])
  hideSuggestionsOnEscape(e: KeyboardEvent) {
    if (e.key == Key.Escape) this.hide();
  }

  private _appendTagText(char: string) {
    if (!char) return;
    this.tagText += char;
    this._emitTagInput();
  }

  private _emitTagInput() {
    this.tagInput$.next(this.tagText);
  }

  toggleSuggestions() {
    if (this.container?.visible) this.hide();
    else this.show();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
