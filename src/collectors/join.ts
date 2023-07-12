export function join(separator: string) {
  return function (iterable: Iterable<string>): string {
    return [...iterable].join(separator);
  };
}
