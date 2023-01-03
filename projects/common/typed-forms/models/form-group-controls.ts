import { TypedAbstractControl } from '../entities/abstract-control';

export type TypedFormGroupControls<T> = {
  [key in keyof T]: TypedAbstractControl<T[key]>;
};
