import { ValidatorFn } from '@angular/forms';
import { TimeOfDay } from '@tim-mhn/common/date';
import { TypedAbstractControl } from '@tim-mhn/common/typed-forms';
import {
  END_TIME_AFTER_START_ERROR_KEY,
  END_TIME_REQUIRED_ERROR_KEY,
  START_TIME_REQUIRED_ERROR_KEY,
} from '../constants/error-keys.constants';
import { requiredTimeInputValidator } from './required.validator';

export function validTimeRangeValidator<S extends string, E extends string>(
  startTimeKey: S = 'startTime' as S,
  endTimeKey: E = 'endTime' as E
) {
  const validatorFn = ((
    control: TypedAbstractControl<{
      [key in S | E]: TimeOfDay;
    }>
  ) => {
    const startTimeCtrl = control.controls[startTimeKey];
    const endTimeCtrl = control.controls[endTimeKey];

    const startTimeMissing = !!requiredTimeInputValidator(startTimeCtrl);
    const startTimeMissingErr = { [START_TIME_REQUIRED_ERROR_KEY]: true };
    if (startTimeMissing) startTimeCtrl.setErrors(startTimeMissingErr);

    const endTimeMissing = !!requiredTimeInputValidator(endTimeCtrl);
    const endTimeMissingErr = { [END_TIME_REQUIRED_ERROR_KEY]: true };

    if (endTimeMissing) endTimeCtrl.setErrors(endTimeMissingErr);

    const endTimeBeforeStartTimeErr = {
      [END_TIME_AFTER_START_ERROR_KEY]: true,
    };

    const endTimeIsAfterStartTime = endTimeCtrl.value?.isAfter(
      startTimeCtrl?.value
    );

    if (!endTimeIsAfterStartTime)
      endTimeCtrl.setErrors(endTimeBeforeStartTimeErr);

    if (startTimeMissing) return startTimeMissingErr;
    if (endTimeMissing) return endTimeMissingErr;
    if (!endTimeIsAfterStartTime) return endTimeBeforeStartTimeErr;

    return null;
  }) as ValidatorFn;

  return validatorFn;
}
