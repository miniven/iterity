export function* breakable<T>(iterable: Iterable<T>): IterableIterator<T> {
    yield* iterable
}
