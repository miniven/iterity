declare global {
    interface Iterator<T> {
        filter?: typeof Array<T>['prototype']['filter'];
    }

    declare const Iterator: Iterator;
}

export {};