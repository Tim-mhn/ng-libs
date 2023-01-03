import { AsyncValidatorFn } from '@angular/forms';
import { FormState } from './form-state';
import { ValidatorOrOpts } from './validator-or-opts';
/**
 * Used when building groups with the following syntax
 *
 * ```
 * this.fb.group({
 *  name: ['', [Validators.required, Validators.minLength(10)], MyAsyncValidator]
 * })
 * ```
 * @type FormControlArrayInput represents the 3-element array input where
 * - Element 0 = FormState: initial value / state
 * - Element 1 = Synchronous validator(s)
 * - Element 2 = Asynchronous validator(s) (optional)
 *
 */
export type FormControlArrayInput<T> = [
  FormState<T>,
  ValidatorOrOpts,
  AsyncValidatorFn?
];
