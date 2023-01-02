export type Constraint<T, V extends Partial<T>> = Omit<T, keyof V> & {
  [key in keyof V]: V[key];
};
