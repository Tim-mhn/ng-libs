import { NgControl } from '@angular/forms';
import { StateManager } from '../models/state-manager';

export function handleFocusLost(
  ngControl: NgControl,
  stateManager?: StateManager
) {
  if (!ngControl?.control?.touched) ngControl?.control?.markAsTouched();
  if (!stateManager?.hasLostFocus) stateManager?.focusLost();
}
