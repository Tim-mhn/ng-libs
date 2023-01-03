import { AbstractControl, Validators } from '@angular/forms';
import { numberValidator } from './number.validator';

describe('numberValidator', () => {
  it('should mark a single digit string as valid', () => {
    const ctrl = buildCtrlWithValue('2');

    expect(numberValidator(ctrl)).toBeNull();
  });

  it('should mark a multi-digit string as valid', () => {
    const ctrl = buildCtrlWithValue('24');

    expect(numberValidator(ctrl)).toBeNull();
  });

  it('should mark an alphabetic string as invalid', () => {
    const ctrl = buildCtrlWithValue('iqair');
    expect(numberValidator(ctrl)).not.toBeNull();
  });

  it('should mark an alpha-numeric string as invalid', () => {
    const ctrl = buildCtrlWithValue('98iqair');

    expect(numberValidator(ctrl)).not.toBeNull();
  });

  it('should mark a string with digits and separators as invalid', () => {
    const ctrl = buildCtrlWithValue('12-34-56');

    expect(numberValidator(ctrl)).not.toBeNull();
  });
});

const buildCtrlWithValue = (n: string) => ({ value: n } as AbstractControl);
