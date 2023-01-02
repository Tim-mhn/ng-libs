import { parseIntAndCatchNaN } from './parse-int';

describe('parseIntWithNanCatch', () => {
  it('should return the int if it is a valid integer string', () => {
    expect(parseIntAndCatchNaN('3')).toEqual(3);
  });

  it('should return 0 if the input is "0"', () => {
    expect(parseIntAndCatchNaN('0')).toEqual(0);
  });

  it('should return null if the input not a valid number', () => {
    expect(parseIntAndCatchNaN('not-a-number')).toBeNull();
  });
});
