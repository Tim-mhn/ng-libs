import { ValidationErrors } from '@angular/forms';
import { ValidationErrorToMessage } from '../models/validation-error-to-message';
import { ValidationErrorToMessagePipe } from './validation-error-to-message.pipe';

describe('ValidationErrorToMessagePipe', () => {
  let pipe: ValidationErrorToMessagePipe;
  beforeEach(() => {
    pipe = new ValidationErrorToMessagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('no errors handling', () => {
    it('should return an empty string when errors is null', () => {
      // setup
      const errors: ValidationErrors = null;
      const field = '';
      const errorToMessageMap = {};
      // action
      const errorMessage = pipe.transform(errors, field, errorToMessageMap);

      // expectation
      expect(errorMessage).toEqual('');
    });

    it('should return an empty string when errors={}', () => {
      // setup
      const errors: ValidationErrors = {};
      const field = '';
      const errorToMessageMap = {};
      // action
      const errorMessage = pipe.transform(errors, field, errorToMessageMap);

      // expectation
      expect(errorMessage).toEqual('');
    });
  });

  it('should return the output of the matching required function when errors is { required: true } ', () => {
    // setup
    const errors: ValidationErrors = {
      required: true,
    };
    const field = 'name';
    // const required
    const requiredMessage = 'this is required';
    const requiredFn = () => requiredMessage;
    const errorToMessageMap: ValidationErrorToMessage = {
      required: requiredFn,
    };

    // action
    const errorMessage = pipe.transform(errors, field, errorToMessageMap);

    // expectation
    expect(errorMessage).toEqual(requiredMessage);
  });

  it('should call the right validationErrorToMessage function ', () => {
    // setup
    const errors: ValidationErrors = {
      email: true,
    };
    const field = 'email';
    const invalidEmailFn = jasmine.createSpy('invalidEmailFn');
    const requiredFn = jasmine.createSpy('requiredFn');

    const errorToMessageMap: ValidationErrorToMessage = {
      required: () => '',
      email: invalidEmailFn,
    };

    // action
    pipe.transform(errors, field, errorToMessageMap);

    // expectation
    expect(invalidEmailFn).toHaveBeenCalledTimes(1);
    expect(requiredFn).not.toHaveBeenCalled();
  });

  it('should call the validationErrorToMessage function with the right input ', () => {
    // setup
    const errors: ValidationErrors = {
      required: true,
    };
    const field = 'name';
    const requiredFn = jasmine.createSpy('requiredFn');
    const errorToMessageMap: ValidationErrorToMessage = {
      required: requiredFn,
    };

    // action
    pipe.transform(errors, field, errorToMessageMap);

    // expectation
    expect(requiredFn).toHaveBeenCalledWith(...['name', undefined]);
  });

  it('should correctly build the min length message ', () => {
    // setup
    const errors: ValidationErrors = {
      minlength: {
        actualLength: 2,
        requiredLength: 10,
      },
    };
    const field = 'name';

    const minLengthMessageFn = (field: string, reqLength: number) =>
      `${field} should be at least ${reqLength} characters long`;
    const errorToMessageMap: ValidationErrorToMessage = {
      minlength: minLengthMessageFn,
    };
    // action
    const errorMessage = pipe.transform(errors, field, errorToMessageMap);

    // expectation
    const expectedErrorMessage = `name should be at least 10 characters long`;
    expect(errorMessage).toEqual(expectedErrorMessage);
  });

  it('should correctly build the email error message ', () => {
    // setup
    const errors: ValidationErrors = {
      email: true,
    };
    const field = 'Email';
    const invalidEmailMessage = `Please enter a valid email`;
    const emailMessageFn = () => invalidEmailMessage;
    const errorToMessageMap: ValidationErrorToMessage = {
      email: emailMessageFn,
    };

    // action
    const errorMessage = pipe.transform(errors, field, errorToMessageMap);

    // expectation
    expect(errorMessage).toEqual(invalidEmailMessage);
  });

  it('should log a warning and return an empty string if given field does not exist in the errorToMessageMap', () => {
    // setup
    const errors = {
      email: true,
    };

    const field = 'email';

    const errorToMessageMapWithoutEmailKey = {
      required: () => 'This is required',
    };

    spyOn(console, 'warn');
    // expectation
    const errorMessage = pipe.transform(
      errors,
      field,
      errorToMessageMapWithoutEmailKey
    );
    expect(console.warn).toHaveBeenCalled();
    expect(errorMessage).toEqual('');
  });
});
