export function areDeepEqual<U>(obj1: U, obj2: U): boolean {
  // this allows to be independent from key order
  const combinedKeyList = [...Object.keys(obj1), ...Object.keys(obj2)].sort();
  return (
    JSON.stringify(obj1, combinedKeyList) ===
    JSON.stringify(obj2, combinedKeyList)
  );
}
