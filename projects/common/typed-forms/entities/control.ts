import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SetValueOptions } from '../models/set-value-option';

export class TypedFormControl<T> extends FormControl {
  override readonly value: T;
  override readonly valueChanges: Observable<T>;

  override setValue(value: T, options?: SetValueOptions) {
    super.setValue(value, options);
  }

  override patchValue(value: Partial<T>, options?: SetValueOptions) {
    super.patchValue(value, options);
  }
}
