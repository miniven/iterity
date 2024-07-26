/**
 * A decorator that extends the iterator with native iterator methods if they are defined
 */
export function WithNativeMethods(_target: any, _propertyKey: symbol | string, descriptor: PropertyDescriptor) {
  if (typeof Iterator === 'function') {
    const method = descriptor.value;

    descriptor.value = function() {
      const iterator = method.call(this, ...arguments);

      Object.setPrototypeOf(iterator, Iterator.prototype);

      return iterator;
    };
  }

  return descriptor;
}