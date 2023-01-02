import { padArrayEnd } from './pad-array';

describe('padArrayEnd', () => {
  it('should create an array with the right length', () => {
    const initialArr = [2, 3, 1];
    const LENGTH = 8;
    expect(padArrayEnd(initialArr, LENGTH, 1).length).toEqual(LENGTH);
  });

  it('should fill the array with the right padding values', () => {
    const initialArr = ['a', 'b', 'a'];
    const LENGTH = 5;

    const paddedArray = padArrayEnd(initialArr, LENGTH, 'padding');
    expect(paddedArray[2]).not.toEqual('padding');
    expect(paddedArray.slice(3, 5)).toEqual(['padding', 'padding']);
  });

  it('the padded array should not be changed if the array has the same length as input length', () => {
    const initialArr = ['a', 'b', 'a'];
    const LENGTH = 3;

    const paddedArray = padArrayEnd(initialArr, LENGTH, 'padding');
    expect(paddedArray).toEqual(initialArr);
  });

  it('should throw an error if input length is smaller than array"s length', () => {
    const initialArr = ['a', 'b', 'a'];
    const LENGTH = 2;

    const paddedArrayFn = () => padArrayEnd(initialArr, LENGTH, 'padding');
    expect(paddedArrayFn).toThrow();
  });
});
