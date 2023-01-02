export function joinWithCustomLastSeparator(
  items: (string | number)[],
  separator: string,
  lastSeparator: string = 'and'
) {
  if (items?.length === 1) return items[0].toString();
  const regex = new RegExp(`${separator}([^${separator}]*)$`);
  const lastItem = items[items.length - 1];
  return items.join(separator).replace(regex, ` ${lastSeparator} ${lastItem}`);
}
