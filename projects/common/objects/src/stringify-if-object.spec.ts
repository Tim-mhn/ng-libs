import { stringifyIfObject } from './stringify-if-object';

describe('stringifyIfObject', () => {
  it('should not stringify a number', () => {
    expect(stringifyIfObject(3)).toEqual(3);
  });

  it('should not stringify booleans', () => {
    expect(stringifyIfObject(false)).toEqual(false);
  });

  it('should stringify objects', () => {
    const user = {
      id: 'random-id',
      age: 13,
    };

    expect(stringifyIfObject(user)).toEqual('{"id":"random-id","age":13}');
  });

  it('should stringify arrays', () => {
    const arr = [1, 2, 3];

    expect(stringifyIfObject(arr)).toEqual('[1,2,3]');
  });
});
