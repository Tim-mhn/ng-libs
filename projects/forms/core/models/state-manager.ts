import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Interface for the StateManager objects
 * Manages
 * -  when to emit a new stateChange event with @property stateChanges$
 * - when & how to update the hasError$ state.
 *
 * hasError$ will be used by the form component to decide whether or not to show an error message / error style
 */
export interface StateManagerOptions {
  waitForFocusLostToShowError: boolean;
}
export interface StateManager {
  hasError$: Observable<boolean>;
  stateChanges$: Observable<void>;
  parent: FormGroupDirective;
  control: AbstractControl;
  hasLostFocus: boolean;
  waitForFocusLostToShowError?: boolean;
  focusLost(): void;
  init(): void;
  destroy(): void;
}
