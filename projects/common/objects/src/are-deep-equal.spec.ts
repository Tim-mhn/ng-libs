import { areDeepEqual } from './are-deep-equal';

describe('areDeepEqual', () => {
  it('should mark objects with different key/values as unequal', () => {
    const user1 = { name: 'foo' };
    const user2 = { name: 'bar' };

    expect(areDeepEqual(user1, user2)).toBeFalse();
  });

  it('should mark objects with different key/values as unequal', () => {
    const user1 = { name: 'foo' };
    const user2 = { name: 'bar' };

    expect(areDeepEqual(user1, user2)).toBeFalse();
  });

  it('should mark objects with exact key/values as equal', () => {
    const user1 = { name: 'foo', id: 5 };
    const user2 = { name: 'foo', id: 5 };

    expect(areDeepEqual(user1, user2)).toBeTrue();
  });

  it('should mark objects with exact key/values as equal even if properties are not in the same order', () => {
    const user1 = { role: 'guest', id: 5, name: 'foo' };
    const user2 = { name: 'foo', id: 5, role: 'guest' };

    expect(areDeepEqual(user1, user2)).toBeTrue();
  });

  it('should mark objects with a subset of common properties as unequal', () => {
    const user1 = { id: 5, name: 'foo' };
    const user2 = { name: 'foo', id: 5, role: 'guest' };

    expect(areDeepEqual(user1, user2)).toBeFalse();
    expect(areDeepEqual(user2, user1)).toBeFalse();
  });
});
