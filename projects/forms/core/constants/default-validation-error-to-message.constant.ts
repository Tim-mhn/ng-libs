/* eslint-disable no-unused-vars */
import { ValidationErrorToMessage } from '../models/validation-error-to-message';

export const DEFAULT_VALIDATION_ERROR_TO_MESSAGE: ValidationErrorToMessage = {
  email: (field: string) => 'Email address is not valid',
  required: (field: string) => `${field} is required`,
  pattern: (field: string) => `${field} is not valid`,
  minlength: (field: string, requiredLength: number) =>
    `${field} must be at least ${requiredLength} characters long`,
  unmatchedPassword: () => 'Password and confirm password do not match',
  duplicatedPassword: () => 'New password must be different',
};
