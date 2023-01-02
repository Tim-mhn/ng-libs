import { reverseMap } from './reverse-map';

describe('reverseMap', () => {
  it('should return the first key that has the matching value', () => {
    const map = {
      hello: 'world',
      foo: 'bar',
    };

    const key = reverseMap(map, 'world');

    expect(key).toEqual('hello');
  });

  it('should return the matching key as a string', () => {
    const map = {
      hello: 'world',
      foo: 'bar',
      3: 'iqair',
    };

    const key = reverseMap(map, 'iqair');

    expect(key).toEqual('3');
  });

  it('should return the first matching key if there are multiple', () => {
    const map = {
      hello: 'world',
      foo: 'bar',
      foo2: 'bar',
    };

    const key = reverseMap(map, 'bar');

    expect(key).toEqual('foo');
  });

  it('should return null if no matching values are found', () => {
    const map = {
      hello: 'world',
      foo: 'bar',
    };

    const key = reverseMap(map, 'not-a-value-in-this-map');

    expect(key).toBeNull();
  });
});
