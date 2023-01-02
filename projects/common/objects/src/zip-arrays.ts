export function zipTwoArrays<U, V>(arr1: U[], arr2: V[]) {
  if (arr1.length !== arr2.length)
    throw new Error('[zip] : arrays do not have the same length');

  const zipped: [U, V][] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr1.length; i++) {
    zipped.push([arr1[i], arr2[i]]);
  }

  return zipped;
}
