export type DeepPartial<T> = {
  [key in keyof T]?: T[key] | DeepPartial<T[key]>;
};
