import { isValidEmail } from './email';

describe('isValidEmail', () => {
  it('should mark emails missing @ as invalid', () => {
    expect(isValidEmail('iqairgmail.com')).toBeFalse();
  });

  it('should mark iqair@gmail. as invalid', () => {
    expect(isValidEmail('iqair@gmail.')).toBeFalse();
  });

  it('should mark @gmail.com as invalid', () => {
    expect(isValidEmail('@gmail.com')).toBeFalse();
  });

  it('should mark iqair@gmail.com as valid', () => {
    expect(isValidEmail('iqair@gmail.com')).toBeTrue();
  });

  it('should mark empty string as invalid', () => {
    expect(isValidEmail('')).toBeFalse();
  });

  it('should mark null as invalid', () => {
    expect(isValidEmail(null)).toBeFalse();
  });

  it('should mark iqair999@gmail.com as valid', () => {
    expect(isValidEmail('iqair999@gmail.com')).toBeTrue();
  });

  it('should mark emails with trailing space as invalid', () => {
    expect(isValidEmail('trailing@space.com ')).toBeFalse();
  });
});
