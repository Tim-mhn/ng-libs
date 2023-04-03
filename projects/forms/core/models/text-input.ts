import { Observable } from 'rxjs';
import { BaseControlValueAccessor } from '../entities';

export interface TextInput extends BaseControlValueAccessor<string> {
  escaped$: Observable<void>;
  updateFormValueAndUI(text: string): void;
  focusInput(): void;
}
