export function parseIntAndCatchNaN(numberStr: string) {
  const int = Number.parseInt(numberStr);
  if (Number.isNaN(int)) return null;
  return int;
}
