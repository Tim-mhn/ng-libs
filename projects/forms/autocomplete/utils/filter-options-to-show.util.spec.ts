import { TimHashtagOption } from '../models';
import { filterOptionsToShow } from './filter-options-to-show.util';

describe('filterOptionsToShow', () => {
  it('should only show an option if the option value starts with the text', () => {
    const option1: TimHashtagOption = {
      value: 'pizza',
    };

    const option2: TimHashtagOption = {
      value: 'fruit',
    };

    const text = 'fr';

    const filteredOptions = filterOptionsToShow([option1, option2], text);

    expect(filteredOptions.length).toEqual(1);
    expect(filteredOptions[0]).toEqual(option2);
  });
});
