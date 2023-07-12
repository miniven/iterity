export function count<T>(iterable: Iterable<T>): number {
  let counter = 0;

  for (const _ of iterable) {
    counter++;
  }

  return counter;
}
