export function isIterable<T>(value: any): value is Iterable<T> {
  return typeof value[Symbol.iterator] === 'function';
}

export function getIterator<T>(value: Iterable<T>): Iterator<T> {
  return value[Symbol.iterator]();
}

export function getIterableIterator<T>(value: Iterable<T>): IterableIterator<T> {
  const iterator = value[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}

// type TFunc<Args extends any[], R> = (...args: Args) => R;

// export function curry<F extends TFunc<any[], any>>(fn: F) {
//   function helper<T>(this: T, ...args: any[]): ReturnType<F> {
//     if (args.length >= fn.length) {
//       return fn.apply(this, args);
//     }

//     return helper.bind(this, ...args) as ReturnType<F>;
//   }

//   return helper;
// }
