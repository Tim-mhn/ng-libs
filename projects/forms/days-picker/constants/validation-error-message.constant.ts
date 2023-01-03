import { ValidationErrorToMessage } from '@tim-mhn/ng-forms/core';

const PLEASE_SELECT_AT_LEAST = 'Please select at least';

export const DAYS_PICKER_VALIDATION_ERROR_MESSAGES: ValidationErrorToMessage = {
  required: () => `${PLEASE_SELECT_AT_LEAST} one day`,
  minLength: (_field: string, requiredLength: number) =>
    `${PLEASE_SELECT_AT_LEAST} ${requiredLength} day${
      requiredLength > 1 ? 's' : ''
    }`,
};
