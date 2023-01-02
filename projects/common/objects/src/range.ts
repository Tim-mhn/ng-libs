export function range(start: number, end: number) {
  if (end < start)
    throw new Error(
      `[range] end should be equal or superior to start. You passed end=${end} and start=${start}`
    );
  const length = end - start;
  return new Array(length).fill('').map((_, index) => start + index);
}
