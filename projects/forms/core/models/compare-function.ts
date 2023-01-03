export type CompareFn<T> = (a: T, b: T) => boolean;

export interface CanUseCustomCompareFn<T> {
  compareFn: CompareFn<T>;
}
