export async function* createAsyncGenerator<T>(source: Iterable<T>) {
  for (const value of source) {
    yield value;
  }
}

export async function* randomAsyncGenerator() {
  while (true) {
    yield Math.random();
  }
}

export function* randomGenerator() {
  while (true) {
    yield Math.random();
  }
}

export function countTraversalTime(collection: Iterable<any>, cb?: Function) {
  const start = Date.now();

  for (const value of collection) {
    cb?.(value);
  }

  return Date.now() - start;
}

export const lensToYieldValue = <T>(data: { value?: T }) => data.value;

export const lensToYieldDone = (data: { done?: boolean }) => data.done;

export const checkNativeMethod = (methodName: string, callback: Function) => {
  return () => {
    if (typeof Iterator !== 'function' || typeof Iterator.prototype[methodName] !== 'function') {
      console.warn(`🟨 Skip test. Iterator.prototype.${methodName} is not defined`);
  
      return expect(true).toBeTruthy();
    }
  
    callback();
  }
}