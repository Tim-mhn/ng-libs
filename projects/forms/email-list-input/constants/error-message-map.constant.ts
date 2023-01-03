import { DEFAULT_VALIDATION_ERROR_TO_MESSAGE } from '@tim-mhn/ng-forms/core';
import { ValidationErrorToMessage } from '@tim-mhn/ng-forms/core';
import { ALL_VALID_EMAILS_ERROR_KEY } from './all-valid-emails-error-key.constant';
import { DUPLICATED_EMAILS } from './duplicated-emails-error.constant';

export const EMAIL_LIST_INPUT_VALIDATION_ERROR_MESSAGES: ValidationErrorToMessage =
  {
    ...DEFAULT_VALIDATION_ERROR_TO_MESSAGE,
    required: () => 'At least one email is required',
    minlength: (_field: string, requiredLength: number) =>
      `Please enter at least ${requiredLength} emails`,
    [ALL_VALID_EMAILS_ERROR_KEY]: () => 'One or more emails are invalid',
    [DUPLICATED_EMAILS]: () => 'Email address has already been added',
  };
