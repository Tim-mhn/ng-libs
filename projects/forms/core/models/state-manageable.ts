import { StateManager } from './state-manager';

/**
 * All form components should implement this interface to have access to stateChanges$ and hasError$ properties from their stateManager
 */
export interface StateManageable {
  stateManager: StateManager;
}
