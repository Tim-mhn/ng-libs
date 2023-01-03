/* eslint-disable no-use-before-define */

import { cursorIsAtTheStart } from '@tim-mhn/common/dom-utils';

export function buildNextTimePeriodDigits(
  numberKey: string,
  currentText: string,
  window: Window
) {
  const selection = window?.getSelection();
  const stringSelection = selection?.toString();
  const hasSelection = stringSelection?.length > 0;

  return hasSelection
    ? buildDigitWhenSelection(numberKey, currentText, selection)
    : buildDigitsWhenNoSelection(numberKey, currentText, window);
}

function buildDigitWhenSelection(
  numberKey: string,
  currentText: string,
  selection: Selection
) {
  const stringSelection = selection?.toString();

  const { anchorOffset } = selection;

  const everythingSelected = stringSelection.length === 2;
  if (everythingSelected) return numberKey;

  const leftDigitSelected = anchorOffset === 0;
  if (leftDigitSelected) {
    const rightDigitOrEmpty = currentText.slice(1);
    return `${numberKey}${rightDigitOrEmpty}`;
  }

  const leftDigitText = currentText.slice(0, 1);
  return `${leftDigitText}${numberKey}`;
}

function buildDigitsWhenNoSelection(
  numberKey: string,
  currentText: string,
  win: Window
) {
  if (cursorIsAtTheStart(win)) return `${numberKey}${currentText}`;
  return `${currentText}${numberKey}`;
}
