import { TimHashtagOption } from '../models/suggestion';
import { buildTextAfterSuggestionInsertion } from './build-text-after-suggestion-insertion.util';

describe('buildTextAfterSuggestionInsertion', () => {
  let suggestion: TimHashtagOption;

  beforeEach(() => {
    suggestion = {
      value: 'music',
    };
  });
  it('should replace "#" with the suggestion entered', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      'i like #',
      suggestion
    );
    expect(textAfterInsertion).toContain('i like music');
  });

  it('should replace "#mu" with the suggestion entered', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      'i like #mu',
      suggestion
    );
    expect(textAfterInsertion).toContain('i like music');
  });

  it('should transform "i like #mu and arts" -> "i like music and arts', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      'i like #mu and arts',
      suggestion
    );
    expect(textAfterInsertion).toMatch(/i like music.*and arts/);
  });

  it('should transform "" -> "music', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      '',
      suggestion
    );
    expect(textAfterInsertion).toContain('music');
  });

  it('should add an extra space after the tag', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      'i like #mu',
      suggestion
    );
    expect(textAfterInsertion).toMatch(/i like music&nbsp;/);
  });

  it('it should correctly replace the tag when the suggestion has the same value. "this is a #test" -> "this is a test" if suggestion.value="test"', () => {
    const textAfterInsertion = buildTextAfterSuggestionInsertion(
      'this is a #test',
      { value: 'test' }
    );
    expect(textAfterInsertion).toEqual('this is a test&nbsp;');
  });
});
