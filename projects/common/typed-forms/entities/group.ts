import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeepPartial } from '@tim-mhn/common/extra-types';
import { TypedFormGroupControls } from '../models/form-group-controls';
import { SetValueOptions } from '../models/set-value-option';
import { TypedAbstractControl } from './abstract-control';

export class TypedFormGroup<T> extends FormGroup {
  override readonly value: T;
  override readonly valueChanges: Observable<T>;
  override controls: TypedFormGroupControls<T>;

  override setValue(
    value: {
      [key in keyof T]: T[key];
    },
    options?: SetValueOptions
  ) {
    super.setValue(value, options);
  }

  override patchValue(value: DeepPartial<T>, options?: SetValueOptions) {
    super.patchValue(value, options);
  }

  override get<K extends keyof T & string>(key: K) {
    return super.get(key) as TypedAbstractControl<T[K]>;
  }

  override getRawValue() {
    return super.getRawValue() as T;
  }
}
