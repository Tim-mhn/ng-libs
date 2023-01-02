// eslint-disable-next-line import/no-extraneous-dependencies
import { OptionallyReadonly } from '@tim-mhn/common/extra-types';
import { areDeepEqual } from './are-deep-equal';
import { objectKeys } from './keys-values-entries';

function defaultEqualFn<T>(a: T, b: T) {
  return a === b;
}

function compareArrays<T>(
  arr1: OptionallyReadonly<T[]>,
  arr2: OptionallyReadonly<T[]>,
  useDeepEqual: boolean
) {
  const equalFn = useDeepEqual ? areDeepEqual : defaultEqualFn;
  return arr1.every((el, index) => equalFn(el, arr2[index]));
}

function compareUsingAllKeys<T>(keys: (keyof T)[]) {
  return (a: T, b: T) => {
    let diff = 0;
    let keyIndex = 0;
    while (diff === 0) {
      const k = keys[keyIndex];
      diff = a[k] > b[k] ? 1 : -1;
      keyIndex += 1;
    }
    return diff;
  };
}

export function arraysAreEqual<T>(
  arr1: OptionallyReadonly<T[]>,
  arr2: OptionallyReadonly<T[]>,
  opts: { ignoreOrder?: boolean; deepEqual?: boolean } = {
    ignoreOrder: false,
    deepEqual: false,
  }
) {
  if (arr1?.length !== arr2.length) return false;

  if (opts.ignoreOrder) {
    const sortCompareFn =
      typeof arr1[0] === 'object'
        ? compareUsingAllKeys(objectKeys(arr1[0]))
        : undefined;
    const sortedArr1 = arr1.concat().sort(sortCompareFn);
    const sortedArr2 = arr2.concat().sort(sortCompareFn);
    return compareArrays(sortedArr1, sortedArr2, opts?.deepEqual);
  }
  return compareArrays(arr1, arr2, opts?.deepEqual);
}
