import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypedAbstractControl } from './abstract-control';

export class TypedFormArray<
  T,
  C extends TypedAbstractControl<T>
> extends FormArray {
  override readonly value: T[];
  override readonly valueChanges: Observable<T[]>;

  override controls: C[];
}
