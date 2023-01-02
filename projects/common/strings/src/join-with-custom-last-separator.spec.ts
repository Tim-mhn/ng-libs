import { joinWithCustomLastSeparator } from './join-with-custom-last-separator';

describe('joinWithCustomLastSeparator', () => {
  it('should return the item as a string if there is only one item', () => {
    expect(joinWithCustomLastSeparator(['hello'], ',')).toEqual('hello');
  });

  it('should return the 2 items separated by the main separator if there only 2 items', () => {
    const items = ['hello', 'world'];

    expect(joinWithCustomLastSeparator(items, ', ', 'and')).toEqual(
      'hello and world'
    );
  });

  it('should return the 2 items separated by the main separator if there only 2 items', () => {
    const items = ['one', 'two', 'three'];
    const lastSeparator = 'and';

    expect(joinWithCustomLastSeparator(items, ', ', lastSeparator)).toEqual(
      'one, two and three'
    );
  });
});
