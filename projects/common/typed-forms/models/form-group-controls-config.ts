import { FormControlArrayInput } from './form-control-array-input';
import { FormState } from './form-state';

export type FormGroupControlsConfig<T> = {
  [key in keyof T]:
    | FormState<T[key]>
    | FormControlArrayInput<T[key]>
    | FormGroupControlsConfig<T[key]>;
};
