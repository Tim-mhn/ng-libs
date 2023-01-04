import { ValidatorFn } from '@angular/forms';
import { TypedAbstractControl } from '@tim-mhn/common/typed-forms';
import { TimeOfDay } from '@tim-mhn/common/date';
import { isValidTime } from '../utils/is-valid-time.util';

export const requiredTimeInputValidator: ValidatorFn = (
  control: TypedAbstractControl<TimeOfDay>
) => {
  const invalid = !isValidTime(control.value);
  return invalid ? { required: true } : null;
};
