export function min(iterable: Iterable<number>): number {
  let min = Infinity;

  for (const num of iterable) {
    if (num < min) {
      min = num;
    }
  }

  return min;
}
