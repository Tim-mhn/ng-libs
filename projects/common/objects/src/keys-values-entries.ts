type Keys<T> = (keyof T)[];

type Values<T> = T[keyof T][];

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

function objectKeys<T>(object: T) {
  return Object.keys(object) as Keys<T>;
}

function objectValues<T>(object: T) {
  return Object.values(object) as Values<T>;
}
function objectEntries<T>(object: T) {
  return Object.entries(object) as Entries<T>;
}

export { Keys, Values, Entries, objectKeys, objectValues, objectEntries };
