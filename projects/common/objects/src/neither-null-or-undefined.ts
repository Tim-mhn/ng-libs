export function nullOrUndefined<U>(obj: U) {
  return obj === null || obj === undefined;
}

export function neitherNullNorUndefined<U>(obj: U) {
  return !nullOrUndefined(obj);
}
