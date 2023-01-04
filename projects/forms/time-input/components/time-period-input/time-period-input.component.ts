import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  cursorIsAtPosition,
  cursorIsAtTheEnd,
  cursorIsAtTheStart,
  moveCursorToEnd,
} from '@tim-mhn/common/dom-utils';
import { nullOrUndefined } from '@tim-mhn/common/objects';
import { parseIntAndCatchNaN } from '@tim-mhn/common/strings';
import { Key } from '@tim-mhn/common/keyboard';

import { buildNextTimePeriodDigits } from '../../utils/build-next-time-period-text.util';

interface UpdateTextContentOptions {
  keepFocus?: boolean;
  checkTimePeriodCompleted?: boolean;
}
@Component({
  selector: 'tim-time-period-input',
  templateUrl: './time-period-input.component.html',
})
export class TimTimePeriodInputComponent implements OnInit {
  @Input() maxValue: number;

  @Input() set timeValue(timeValue: number) {
    if (this.hasFocus) return;
    const newTextContent = this._buildTextContentFromTimeValue(timeValue);
    this._updateTextContent(newTextContent, {
      keepFocus: false,
      checkTimePeriodCompleted: false,
    });
  }

  @Input() disabled: boolean;

  @Output() timeValueChange = new EventEmitter<number>();
  @Output() focusChange = new EventEmitter<boolean>();
  @Output() timePeriodCompleted = new EventEmitter<void>();
  @Output() jumpToPrevious = new EventEmitter<void>();
  @Output() jumpToNext = new EventEmitter<void>();

  @ViewChild('timePeriodInput', { static: true })
  timePeriodEl: ElementRef<HTMLElement>;

  private DEFAULT_UPDATE_TEXT_CONTENT_OPTIONS: UpdateTextContentOptions = {
    checkTimePeriodCompleted: true,
    keepFocus: true,
  };
  readonly ACCEPTED_KEYS: string[] = [
    Key.Backspace,
    Key.Tab,
    Key.ArrowLeft,
    Key.ArrowRight,
    Key.Escape,
    Key.Delete,
  ];
  constructor() {}

  readonly NUMBER_OF_DIGITS = 2;

  hasFocus = false;
  toggleFocus(hasFocus: boolean) {
    this.hasFocus = hasFocus;
    this.focusChange.emit(hasFocus);
  }

  ngOnInit() {}

  onFocusLost() {
    this.toggleFocus(false);
    if (this.currentTextContent?.length === 1) {
      const textContentStartWith0 = this.currentTextContent.padStart(2, '0');
      this._updateTextContent(textContentStartWith0, {
        keepFocus: false,
      });
    }

    this._updateAndEmitTimeValue(
      parseIntAndCatchNaN(this.timePeriodEl.nativeElement.textContent)
    );
  }

  dashPlaceholdersToShow = this.NUMBER_OF_DIGITS;

  updateDashPlaceholdersCount() {
    this.dashPlaceholdersToShow =
      this.NUMBER_OF_DIGITS -
      (this.timePeriodEl.nativeElement?.textContent?.length || 0);
  }

  public focusInput() {
    this.timePeriodEl.nativeElement.focus();
    this.toggleFocus(true);
  }

  onKeydown(event: KeyboardEvent) {
    const key = event.key;

    const number = parseInt(key);
    const isValidNumber = !Number.isNaN(number);

    const canExecuteCommand = this.ACCEPTED_KEYS.includes(key) || isValidNumber;

    if (!canExecuteCommand) {
      event.preventDefault();
    }

    if (isValidNumber) {
      event.preventDefault();

      this._resetInputIfCursorAtStart();
      this._removeSecondDigitIfCursorInMiddle();

      if (this.currentTextContent === '' && number > this.maxFirstDigit) {
        this._updateTextContent(key.padStart(2, '0'));
        return;
      }

      const potentialTextContent = this._potentialNextDigitsText(key);
      const potentialTimePeriodValue = parseInt(potentialTextContent);
      if (potentialTimePeriodValue > this.maxValue) {
        this._updateTextContent(this.maxValue.toString());
        return;
      }
      this._updateTextContent(potentialTextContent);
    }

    if (key === Key.ArrowLeft && cursorIsAtTheStart(window))
      this.jumpToPrevious.emit();

    if (key === Key.ArrowRight && cursorIsAtTheEnd(window))
      this.jumpToNext.emit();
  }

  private _resetInputIfCursorAtStart() {
    if (cursorIsAtTheStart(window))
      this.timePeriodEl.nativeElement.textContent = '';
  }

  private _removeSecondDigitIfCursorInMiddle() {
    if (cursorIsAtPosition(window, 1)) {
      this.timePeriodEl.nativeElement.textContent =
        this.timePeriodEl.nativeElement.textContent.slice(0, 1);

      moveCursorToEnd(this.timePeriodEl.nativeElement, document, window);
    }
  }

  private _potentialNextDigitsText(numberKey: string) {
    return buildNextTimePeriodDigits(
      numberKey,
      this.currentTextContent,
      window
    );
  }

  onPlaceholdersFocus() {
    this.timePeriodEl.nativeElement.focus();
  }

  onInputChange(e: Event) {
    const updatedTimePeriodStr = (e as any).path[0].innerHTML;
    const numberOrNull = parseIntAndCatchNaN(updatedTimePeriodStr); // avoids emitting NaN
    this._updateAndEmitTimeValue(numberOrNull);
    this.updateDashPlaceholdersCount();
  }

  private _buildTextContentFromTimeValue(timeValue: number) {
    if (Number.isNaN(timeValue) || nullOrUndefined(timeValue)) return '';

    return timeValue?.toString().padStart(this.NUMBER_OF_DIGITS, '0');
  }

  private _updateTextContent(
    timeValue: string,
    _opts: UpdateTextContentOptions = this.DEFAULT_UPDATE_TEXT_CONTENT_OPTIONS
  ) {
    const opts = {
      ...this.DEFAULT_UPDATE_TEXT_CONTENT_OPTIONS,
      ..._opts,
    };

    this.timePeriodEl.nativeElement.textContent = timeValue;
    this.updateDashPlaceholdersCount();
    if (opts.keepFocus)
      moveCursorToEnd(this.timePeriodEl.nativeElement, document, window);
    if (
      timeValue?.length === this.NUMBER_OF_DIGITS &&
      opts.checkTimePeriodCompleted
    )
      this.timePeriodCompleted.emit();
  }

  private _updateAndEmitTimeValue(timeValue: number) {
    this.timeValue = timeValue;
    this.timeValueChange.emit(timeValue);
  }

  private get maxFirstDigit() {
    return Number.parseInt(this.maxValue?.toString()?.[0]);
  }

  private get currentTextContent() {
    return this.timePeriodEl?.nativeElement?.textContent;
  }
}
