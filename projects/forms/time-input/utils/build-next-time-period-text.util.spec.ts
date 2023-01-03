import { buildNextTimePeriodDigits } from './build-next-time-period-text.util';

describe('buildNextTimePeriodDigits', () => {
  it('should just return the digit key if there is no currentText', () => {
    const mockWindow = buildMockWindowFromSelection(EMPTY_SELECTION);

    expect(buildNextTimePeriodDigits('4', '', mockWindow)).toEqual('4');
  });

  it('should add the new digit to the current digit if there is only one current digit', () => {
    const currentDigit = '2';
    const selection = {
      toString: () => '',
      anchorOffset: 0,
    } as any as Selection;

    const mockWindow = buildMockWindowFromSelection(selection);
    expect(buildNextTimePeriodDigits('8', currentDigit, mockWindow)).toEqual(
      '28'
    );
  });

  it('should replace the current text by the new digit key if everything is selected', () => {
    const currentDigits = '45';
    const selection = {
      toString: () => currentDigits,
      anchorOffset: 0,
    } as any as Selection;

    const mockWindow = buildMockWindowFromSelection(selection);
    expect(buildNextTimePeriodDigits('2', currentDigits, mockWindow)).toEqual(
      '2'
    );
  });

  it('should replace the first digit by the new digit key if the first digit is selected', () => {
    const currentDigits = '45';
    const selection = {
      toString: () => '4',
      anchorOffset: 0,
    } as any as Selection;

    const mockWindow = buildMockWindowFromSelection(selection);
    expect(buildNextTimePeriodDigits('2', currentDigits, mockWindow)).toEqual(
      '25'
    );
  });

  it('should replace the second digit by the new digit key if the second digit is selected', () => {
    const currentDigits = '45';
    const selection = {
      toString: () => '5',
      anchorOffset: 2,
    } as any as Selection;

    const mockWindow = buildMockWindowFromSelection(selection);
    expect(buildNextTimePeriodDigits('2', currentDigits, mockWindow)).toEqual(
      '42'
    );
  });
});

function buildMockWindowFromSelection(selection: Selection) {
  return {
    getSelection: () => selection,
  } as Window;
}
const EMPTY_SELECTION: Selection = {
  toString: () => '',
  anchorOffset: 0,
} as any as Selection;
