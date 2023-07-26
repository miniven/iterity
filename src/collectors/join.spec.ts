import { createAsyncGenerator } from '../tests/helpers';
import { join, joinAsync } from './join';

describe('collectors/join', () => {
  test('join function returns correct string', () => {
    const joinWithSlash = join('/');

    expect(joinWithSlash(['1', '2', '3'])).toBe('1/2/3');
    expect(joinWithSlash([])).toBe('');
    expect(joinWithSlash(['one'])).toBe('one');
    expect(joinWithSlash('123')).toBe('1/2/3');
    expect(joinWithSlash(new Set(['/', '/', '/']))).toBe('/');
  });

  test('joinAsync function returns correct string', async () => {
    const joinWithSlash = joinAsync('/');

    expect(joinWithSlash(createAsyncGenerator(['1', '2', '3']))).resolves.toBe('1/2/3');
    expect(joinWithSlash(createAsyncGenerator(['one']))).resolves.toBe('one');
    expect(joinWithSlash(createAsyncGenerator([]))).resolves.toBe('');
  });
});
