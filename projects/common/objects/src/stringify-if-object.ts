export function stringifyIfObject<T>(o: T): T | string {
  return typeof o === 'object' ? JSON.stringify(o) : o;
}
