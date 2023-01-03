import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypedFormGroupControls } from '../models/form-group-controls';
import { SetValueOptions } from '../models/set-value-option';

export abstract class TypedAbstractControl<T> extends AbstractControl {
  override readonly value: T;
  override readonly valueChanges: Observable<T>;

  abstract override setValue(value: T, options?: SetValueOptions): void;

  controls?: TypedFormGroupControls<T>;
}
