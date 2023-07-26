import { createAsyncGenerator } from '../tests/helpers';
import { product, productAsync } from './product';

describe('collectors/product', () => {
  test('product function returns product of numeric iterable collection', () => {
    expect(product([])).toBe(0);
    expect(product([1, 2, 3])).toBe(6);
    expect(product(new Set([1, 2, 3]))).toBe(6);
  });

  test('productAsync function returns product of numeric iterable async collection', async () => {
    expect(productAsync(createAsyncGenerator([1, 2, 3]))).resolves.toBe(6);
    expect(productAsync(createAsyncGenerator([]))).resolves.toBe(0);
  });
});
