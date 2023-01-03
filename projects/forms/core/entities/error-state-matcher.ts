import { Injectable } from '@angular/core';
import { StateManager } from '../models/state-manager';

/**
 * Handles when to show error or not inside a form component
 * Show an error if
 * - control is invalid AND
 * - user has changed the control's value or touched the control OR form has been submitted
 */
@Injectable({ providedIn: 'root' })
export class ErrorStateMatcher {
  isErrorState(stateManager: StateManager) {
    const isSubmitted = stateManager.parent?.submitted;
    const touchedOrDirty =
      stateManager.control.dirty || stateManager.control.touched;
    const invalid = stateManager.control.invalid;

    const focusLostConditionsMet =
      this._canShowErrorWithFocusConditions(stateManager);

    return (
      invalid && ((touchedOrDirty && focusLostConditionsMet) || isSubmitted)
    );
  }

  private _canShowErrorWithFocusConditions(stateManager: StateManager) {
    const hasLostFocus = stateManager.hasLostFocus;
    const ignoreFocusLost = !stateManager.waitForFocusLostToShowError;
    return hasLostFocus || ignoreFocusLost;
  }
}
