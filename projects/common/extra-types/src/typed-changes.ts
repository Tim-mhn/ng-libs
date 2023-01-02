import { SimpleChange } from '@angular/core';

type ComponentPropsWithoutFunctions<C> = {
  [key in keyof C]?: C[key] extends Function ? never : key;
};

type ComponentPropKeys<C> = ComponentPropsWithoutFunctions<C>[keyof C];

type ComponentProps<C> = Pick<C, ComponentPropKeys<C>>;

class TypedSimpleChange<T> extends SimpleChange {
  override previousValue: T;
  override currentValue: T;
  override firstChange: boolean;
}

export type TypedChanges<C> = {
  [key in keyof ComponentProps<C>]?: TypedSimpleChange<C[key]>;
};
