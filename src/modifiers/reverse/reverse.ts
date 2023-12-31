import { createIterableIterator, createIteratorReturn, createIteratorYield, Reversible } from '../../core';

/**
 * Returns iterator for walking through indexed value in reverse order
 *
 * @param value Indexed iterable value, such as array or string
 * @returns Iterable iterator
 */
function indexedToReversed<T>(value: Array<T>): IterableIterator<T>;
function indexedToReversed<T>(value: string & Iterable<T>): IterableIterator<T>;
function indexedToReversed<T>(value: Array<T> | (string & Iterable<T>)): IterableIterator<T> {
  let index = value.length - 1;

  return createIterableIterator(function () {
    if (index < 0) {
      return createIteratorReturn();
    }

    return createIteratorYield(value[index--] as T);
  });
}

function isIterableString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Returns iterator for walking through iterable value in reverse order
 *
 * @example
 *   from([1, 2, 3]).pipe(reverse); // [3, 2, 1]å
 *
 * @param iterable Iterable value
 * @returns {IterableIterator} Iterable iterator
 */
export function reverse<T>(iterable: Iterable<T>): Iterable<T> {
  if (iterable instanceof Reversible) {
    return iterable.reverse();
  }

  if (Array.isArray(iterable)) {
    return indexedToReversed(iterable);
  }

  if (isIterableString(iterable)) {
    return indexedToReversed(iterable);
  }

  const stack: T[] = [];

  for (const value of iterable) {
    stack.push(value);
  }

  return createIterableIterator(function () {
    if (stack.length) {
      return createIteratorYield(stack.pop()!);
    }

    return createIteratorReturn();
  });
}
