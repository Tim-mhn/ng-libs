export function padArrayEnd<T>(arr: T[], len: number, padding: T) {
  return arr.concat(Array(len - arr.length).fill(padding));
}
