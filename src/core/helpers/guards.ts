export function isIterable<T>(value: any): value is Iterable<T> {
  return typeof value[Symbol.iterator] === 'function';
}

export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return typeof value[Symbol.asyncIterator] === 'function';
}
