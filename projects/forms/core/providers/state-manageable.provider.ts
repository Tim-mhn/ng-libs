import { ComponentType } from '@angular/cdk/portal';
import { forwardRef, InjectionToken, Provider } from '@angular/core';
import { StateManageable } from '../models/state-manageable';

export const STATE_MANAGEABLE_TOKEN = new InjectionToken<StateManageable>(
  'State Manageable'
);

export function stateManageableProvider<T>(
  componentType: ComponentType<T>
): Provider {
  return {
    provide: STATE_MANAGEABLE_TOKEN,
    useExisting: forwardRef(() => componentType),
  };
}
