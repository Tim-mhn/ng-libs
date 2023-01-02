import { arraysAreEqual } from './arrays-are-equal';

describe('arraysAreEqual', () => {
  it('should mark number arrays as equal', () => {
    const arr1 = [1, 3, 4];
    const arr2 = [1, 3, 4];

    expect(arraysAreEqual(arr1, arr2)).toBeTrue();
  });

  it('should mark different number arrays as not equal', () => {
    const arr1 = [1, 3, 4];
    const arr2 = [1, 3, 5];

    expect(arraysAreEqual(arr1, arr2)).toBeFalse();
  });

  it('should mark arrays with different length as not equal', () => {
    const arr1 = [1, 3, 4];
    const arr2 = [1, 3, 4, 6];

    expect(arraysAreEqual(arr1, arr2)).toBeFalse();
  });

  it('should mark string arrays as equal', () => {
    const arr1 = ['foo', 'bar'];
    const arr2 = ['foo', 'bar'];

    expect(arraysAreEqual(arr1, arr2)).toBeTrue();
  });

  it('should work with empty arrays', () => {
    expect(arraysAreEqual([], [])).toBeTrue();
  });

  describe('ignoreOrder option', () => {
    it('should not care about the order if ignoreOrder: true', () => {
      const arr1 = ['foo', 'bar', 'deno'];
      const arr2 = ['foo', 'deno', 'bar'];

      expect(arraysAreEqual(arr1, arr2, { ignoreOrder: true })).toBeTrue();
    });

    it('should care about the order if ignoreOrder is not specified', () => {
      const arr1 = ['foo', 'bar', 'deno'];
      const arr2 = ['foo', 'deno', 'bar'];

      expect(arraysAreEqual(arr1, arr2)).toBeFalse();
    });

    describe('should work with objects', () => {
      it('should work with objects with one property', () => {
        const foo = { name: 'foo' };
        const bar = { name: 'bar' };

        const arr1 = [foo, bar];
        const arr2 = [bar, foo];

        expect(arraysAreEqual(arr1, arr2, { ignoreOrder: true })).toBeTrue();
      });

      it('should work with objects with multiple properties', () => {
        const foo = { name: 'foo', id: 1 };
        const bar = { name: 'bar', id: 2 };

        const arr1 = [foo, bar];
        const arr2 = [bar, foo];

        expect(arraysAreEqual(arr1, arr2, { ignoreOrder: true })).toBeTrue();
      });

      it('should work with objects with multiple properties written in different order', () => {
        const foo = { role: 'guest', name: 'foo', id: 1 };
        const bar = { id: 2, name: 'bar', role: 'admin' };

        const arr1 = [foo, bar];
        const arr2 = [bar, foo];

        expect(arraysAreEqual(arr1, arr2, { ignoreOrder: true })).toBeTrue();
      });
    });
  });

  describe('deepEqual option', () => {
    it('by default, it should not work with objects that have different references', () => {
      const foo1 = { name: 'foo' };
      const foo2 = { name: 'foo' };
      const bar1 = { name: 'bar' };
      const bar2 = { name: 'bar' };

      const arr1 = [foo1, bar1];
      const arr2 = [foo2, bar2];

      expect(arraysAreEqual(arr1, arr2)).toBeFalse();
    });

    it('should work with objects that have different references when deepEqual=true', () => {
      const foo1 = { name: 'foo' };
      const foo2 = { name: 'foo' };
      const bar1 = { name: 'bar' };
      const bar2 = { name: 'bar' };

      const arr1 = [foo1, bar1];
      const arr2 = [foo2, bar2];

      expect(arraysAreEqual(arr1, arr2, { deepEqual: true })).toBeTrue();
    });
  });

  describe('deepEqual and ignoreOrder together', () => {
    it('should mark arrays of objects as equal if they have the same key/values', () => {
      const foo1 = { name: 'foo', id: 1 };
      const bar1 = { id: 2, name: 'bar' };

      const foo2 = { name: 'foo', id: 1 };
      const bar2 = { name: 'bar', id: 2 };

      const arr1 = [foo1, bar1];
      const arr2 = [bar2, foo2];

      expect(
        arraysAreEqual(arr1, arr2, { deepEqual: true, ignoreOrder: true })
      ).toBeTrue();
    });
  });
});
