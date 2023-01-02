import { range } from './range';

describe('range', () => {
  it('should return an array with the correct length', () => {
    expect(range(0, 10).length).toEqual(10);
  });

  it('should contain all the numbers from start to end, exluding end', () => {
    expect(range(0, 4)).toEqual([0, 1, 2, 3]);
  });

  it('should contain all the numbers from start to end, exluding end', () => {
    expect(range(2, 7)).toEqual([2, 3, 4, 5, 6]);
  });

  it('should throw an error if end < start', () => {
    const rangeFn = () => range(2, -3);

    expect(rangeFn).toThrow();
  });
});
