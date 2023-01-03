import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder } from '@angular/forms';
import {
  TypedAbstractControl,
  TypedFormArray,
  TypedFormControl,
  TypedFormGroup,
} from '../entities';
import { AsyncValidator } from '../models/async-validator';
import { FormGroupControlsConfig } from '../models/form-group-controls-config';
import { FormState } from '../models/form-state';
import { ValidatorOrOpts } from '../models/validator-or-opts';

@Injectable()
export class TypedFormBuilder extends FormBuilder {
  override group<T>(
    controlsConfig: FormGroupControlsConfig<T>,
    options?: AbstractControlOptions | null
  ): TypedFormGroup<T> {
    return super.group(controlsConfig, options) as TypedFormGroup<T>;
  }

  override control<T>(
    formState: FormState<T>,
    validatorOrOpts?: ValidatorOrOpts,
    asyncValidator?: AsyncValidator
  ): TypedFormControl<T> {
    return super.control(formState, validatorOrOpts, asyncValidator);
  }

  override array<T, C extends TypedAbstractControl<T>>(
    controlsConfig: C[],
    validatorOrOpts?: ValidatorOrOpts,
    asyncValidator?: AsyncValidator
  ): TypedFormArray<T, C> {
    return super.array(
      controlsConfig,
      validatorOrOpts,
      asyncValidator
    ) as TypedFormArray<T, C>;
  }
}
