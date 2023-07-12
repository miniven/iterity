export function max(iterable: Iterable<number>): number {
  let max = -Infinity;

  for (const num of iterable) {
    if (num > max) {
      max = num;
    }
  }

  return max;
}
