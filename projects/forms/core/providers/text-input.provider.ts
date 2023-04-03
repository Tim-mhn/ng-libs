import { ComponentType } from '@angular/cdk/portal';
import { forwardRef, InjectionToken, Provider } from '@angular/core';
import { TextInput } from '../models';

export const TEXT_INPUT_TOKEN = new InjectionToken<TextInput>('Text Input');

export function textInputProvider<T>(
  componentType: ComponentType<T>
): Provider {
  return {
    provide: TEXT_INPUT_TOKEN,
    useExisting: forwardRef(() => componentType),
  };
}
