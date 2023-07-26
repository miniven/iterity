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

export const lensToYieldValue = <T>(data: { value?: T }) => data.value;

export const lensToYieldDone = (data: { done?: boolean }) => data.done;
