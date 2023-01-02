import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachWord,
} from './capitalize';

describe('String utils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should only capitalize the first letter', () => {
      expect(capitalizeFirstLetter('word')).toEqual('Word');
    });

    it('should not capitalize the first letter of other words', () => {
      expect(capitalizeFirstLetter('this is a sentence')).toEqual(
        'This is a sentence'
      );
    });
  });

  describe('capitalizeFirstLetterOfEachWord', () => {
    it('should capitalize the first letter of the string', () => {
      expect(capitalizeFirstLetterOfEachWord('this is a sentence')[0]).toEqual(
        'T'
      );
    });

    it('should capitalize the first letter of each word', () => {
      expect(capitalizeFirstLetterOfEachWord('this is a sentence')).toEqual(
        'This Is A Sentence'
      );
    });
  });
});
