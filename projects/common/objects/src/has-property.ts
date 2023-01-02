export function hasProperty<U, K extends keyof U>(obj: U, key: K) {
  if (!obj) return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
  // eslint recommendation to use Object.prototype.hasOwnProperty
  // see https://eslint.org/docs/rules/no-prototype-builtins
}
