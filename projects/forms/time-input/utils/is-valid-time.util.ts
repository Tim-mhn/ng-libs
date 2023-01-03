import { neitherNullNorUndefined } from '@tim-mhn/common/objects';
import { TimeOfDay } from '@tim-mhn/common/date';

export function isValidTime(time: TimeOfDay) {
  return (
    neitherNullNorUndefined(time?.hours) &&
    neitherNullNorUndefined(time?.minutes)
  );
}
