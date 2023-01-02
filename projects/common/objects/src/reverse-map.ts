import { objectEntries } from './keys-values-entries';

export function reverseMap<K, V>(
  map: { [key in keyof K]?: V },
  targetValue: V
): keyof K {
  const entryFound = objectEntries(map).filter(
    (entry) => entry[1] === targetValue
  )?.[0];

  const targetKey = entryFound?.[0] ?? null;

  return targetKey;
}
