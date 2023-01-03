import { ValidatorFn } from '@angular/forms';
import { TimeOfDay } from '../../../../date/entities/time-of-day.entity';
import { TypedAbstractControl } from '../../../../typed-forms';
import { isValidTime } from '../utils/is-valid-time.util';

export const requiredTimeInputValidator: ValidatorFn = (
  control: TypedAbstractControl<TimeOfDay>
) => {
  const invalid = !isValidTime(control.value);
  return invalid ? { required: true } : null;
};
