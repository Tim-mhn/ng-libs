import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_VALIDATION_ERROR_TO_MESSAGE } from '../constants/default-validation-error-to-message.constant';
import { ValidationErrorToMessage } from '../models/validation-error-to-message';

@Pipe({
  name: 'validationErrorToMessage',
})
export class ValidationErrorToMessagePipe implements PipeTransform {
  transform(
    errors: ValidationErrors,
    field: string,
    errorToMessageMap = DEFAULT_VALIDATION_ERROR_TO_MESSAGE
  ): string {
    if (this._hasNoErrors(errors)) return '';
    const { key, value } = this.getKeyValue(errors);
    return this._buildErrorMessage(errorToMessageMap, key, value, field);
  }

  private _hasNoErrors(errors: ValidationErrors) {
    return !errors || Object.keys(errors).length === 0;
  }

  private getKeyValue(errors: ValidationErrors): { key: string; value: any } {
    const key = Object.keys(errors)[0];
    const value = this._getErrorValue(errors, key);
    return { key, value };
  }

  private _getErrorValue(errors: ValidationErrors, key: string) {
    let value;
    // eslint-disable-next-line default-case
    switch (key) {
      case 'required':
      case 'email':
      case 'unmatchedPassword':
        break;
      case 'duplicatedPassword':
        break;
      case 'minlength':
      case 'maxlength':
        value = errors[key].requiredLength;
        break;
    }
    return value;
  }

  private _buildErrorMessage(
    errorToMessageMap: ValidationErrorToMessage,
    key: string,
    errorValue: any,
    field = 'field name'
  ) {
    try {
      return errorToMessageMap[key](field, errorValue);
    } catch (err) {
      console.warn(
        `[ValidationErrorToMessagePipe]: Error when building error message for key: ${key} `,
        errorToMessageMap
      );
      return '';
    }
  }
}
