import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { firstValueFrom, skip, take } from 'rxjs';
import { Key } from '@tim-mhn/common/keyboard';
import { TimHtmlInput } from '../components/html-input/html-input.component';
import { TimAutocompleteModule } from '../module';
import { TimHashtagAutoCompleteDirective } from './hashtag-autocomplete.directive';

@Component({
  template: `
    <tim-html-input
      [formControl]="fc"
      #timInput
      [timHashtagAutocomplete]="autocomplete"
    ></tim-html-input>

    <tim-hashtag-autocomplete #autocomplete>
      <tim-hashtag-option *ngFor="let sugg of suggestions" [value]="sugg">
        {{ sugg }}</tim-hashtag-option
      >
    </tim-hashtag-autocomplete>
  `,
})
class HostComponent {
  @ViewChild('timInput', { static: true }) input: TimHtmlInput;
  hello = 'aceacaec';

  fc = new FormControl('');

  readonly suggestions = ALL_SUGGESTIONS;

  constructor() {}
}

const ALL_SUGGESTIONS = ['sports', 'cooking', 'yoga', 'museums', 'arts'];

describe('TimHashtagAutoCompleteDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let dir: TimHashtagAutoCompleteDirective;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HostComponent, TimHashtagAutoCompleteDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [OverlayModule, ReactiveFormsModule, TimAutocompleteModule],
    }).createComponent(HostComponent);

    fixture.detectChanges();

    const des = fixture.debugElement.queryAll(
      By.directive(TimHashtagAutoCompleteDirective)
    );
    dir = des[0].injector.get(
      TimHashtagAutoCompleteDirective
    ) as TimHashtagAutoCompleteDirective;

    spyOn(dir, 'toggleSuggestions').and.callThrough();
    spyOn(dir, 'hide').and.callThrough();
    spyOn(dir, 'show').and.callThrough();
    spyOn(dir, 'onInput').and.callThrough();
  });

  const getSuggestions = () => firstValueFrom(dir.container?.suggestions$);

  it('should be created', () => {
    expect(fixture).toBeDefined();
    expect(dir).toBeDefined();
  });

  it('should correctly attach the HTMLInput  ', () => {
    const htmlInput = dir.input;
    expect(htmlInput).toBeDefined();
  });

  describe('show/hide suggestions', () => {
    it('should toggle suggestions on the first # input', () => {
      dispatchInputEvent('#', fixture);
      fixture.detectChanges();

      expect(dir.onInput).toHaveBeenCalled();
    });

    it('suggestions should not be visible on 2 following "#" inputs', () => {
      dispatchInputEvent('#', fixture);
      dispatchInputEvent('#', fixture);
      fixture.detectChanges();

      expect(dir.hide).toHaveBeenCalled();
      expect(dir.show).toHaveBeenCalledBefore(dir.hide);
    });

    it('suggestions should not be visible after typing a space. Input: "#s "', () => {
      dispatchInputEvent('#', fixture);
      dispatchInputEvent('s', fixture);
      dispatchInputEvent(' ', fixture);

      fixture.detectChanges();

      expect(dir.hide).toHaveBeenCalled();
      expect(dir.show).toHaveBeenCalledBefore(dir.hide);
    });

    it('should not break if typing a space " " as a first input', () => {
      dispatchInputEvent(' ', fixture);

      fixture.detectChanges();

      expect(dir.onInput).not.toThrow();
    });

    it('should hide suggestions after any document click', () => {
      const clickEvent = new Event('click');
      document.dispatchEvent(clickEvent);

      fixture.detectChanges();

      expect(dir.hide).toHaveBeenCalled();
    });

    it('should hide suggestions on pressing ESCAPE', () => {
      const escapeClickEvent = new KeyboardEvent('keydown', {
        key: Key.Escape,
      });
      document.dispatchEvent(escapeClickEvent);

      fixture.detectChanges();

      expect(dir.hide).toHaveBeenCalled();
    });
  });

  describe('list of suggestions', () => {
    it('should show all suggestions after the first # entered', (done: DoneFn) => {
      dispatchInputEvent('#', fixture);
      fixture.detectChanges();

      const suggestions$ = dir.container?.suggestions$;

      suggestions$.subscribe((suggestions) => {
        expect(suggestions.length).toEqual(ALL_SUGGESTIONS.length);
        done();
      });
    });

    it('should show only the suggestions starting with the text after "#" ', (done: DoneFn) => {
      dispatchInputEvent('#', fixture);
      dispatchInputEvent('c', fixture);
      fixture.detectChanges();

      const suggestions$ = dir.container?.suggestions$;

      suggestions$.pipe(skip(1), take(1)).subscribe((suggestions) => {
        expect(suggestions.length).toEqual(1);
        expect(suggestions[0].value).toEqual('cooking');
        done();
      });
    });
  });

  describe('update input value on suggestion click', () => {
    let timInput: TimHtmlInput;

    beforeEach(() => {
      timInput = fixture.componentInstance.input;
    });

    it('After typing "#" and clicking on "yoga", the input value should be "yoga"', async () => {
      dispatchInputEvent('#', fixture);

      const allSuggestions = await getSuggestions();
      const yogaSuggestionIndex = ALL_SUGGESTIONS.indexOf('yoga');

      const suggestion = allSuggestions[yogaSuggestionIndex];

      suggestion.click();

      fixture.detectChanges();

      expect(timInput.value).toEqual('yoga');
      expect(timInput.inputHTML).toEqual('yoga');
    });

    it('After typing some initial text "i like" , then "#" and then clicking on "arts", the input value should be "i like arts"', async () => {
      timInput.updateFormValueAndUI('i like ');

      fixture.detectChanges();

      dispatchInputEvent('#', fixture);

      const allSuggestions = await getSuggestions();
      const artsSuggestionIndex = ALL_SUGGESTIONS.indexOf('arts');
      const suggestion = allSuggestions[artsSuggestionIndex];

      suggestion.click();

      fixture.detectChanges();

      const expectedInputValue = 'i like arts';
      expect(timInput.value).toContain(expectedInputValue);
      expect(timInput.inputHTML).toContain(expectedInputValue);
    });
  });

  describe('tag template', () => {
    let timInput: TimHtmlInput;

    beforeEach(() => {
      timInput = fixture.componentInstance.input;
    });

    it('should use the tag template to set the input value', async () => {
      dir.autocomplete.tagTemplate = (tagText: string) =>
        `<strong>${tagText}</strong>`;

      dispatchInputEvent('#', fixture);

      const allSuggestions = await getSuggestions();
      const yogaSuggestionIndex = ALL_SUGGESTIONS.indexOf('yoga');

      const suggestion = allSuggestions[yogaSuggestionIndex];

      suggestion.click();

      fixture.detectChanges();

      const expectedTagHTML = '<strong>yoga</strong>';
      expect(timInput.value).toEqual(expectedTagHTML);
      expect(timInput.inputHTML).toEqual(expectedTagHTML);
    });
  });
});

function dispatchInputEvent(
  text: string,
  fixture: ComponentFixture<HostComponent>
) {
  const event = new InputEvent('input', {
    data: text,
  });
  const debugInput = fixture.debugElement.query(By.directive(TimHtmlInput));
  debugInput.triggerEventHandler('input', event);
}
