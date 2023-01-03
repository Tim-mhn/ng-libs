import { ValidationErrorToMessage } from '@tim-mhn/ng-forms/core';
import {
  END_TIME_AFTER_START_ERROR_KEY,
  END_TIME_REQUIRED_ERROR_KEY,
  START_TIME_REQUIRED_ERROR_KEY,
} from './error-keys.constants';

export const TIME_RANGE_VALIDATION_ERROR_MESSAGES: ValidationErrorToMessage = {
  [END_TIME_AFTER_START_ERROR_KEY]: () =>
    `End time should be later than start time`,
  [START_TIME_REQUIRED_ERROR_KEY]: () => 'Start time is required',
  [END_TIME_REQUIRED_ERROR_KEY]: () => 'End time is required',
};
