import { TimHashtagOption } from '../models';

const HASHTAG_REGEX = /(.*)(#(?:[^ ]*)?)(.*)/;

const HASHTAG_GROUP_INDEX = 1;
export function buildTextAfterSuggestionInsertion(
  currentText: string,
  suggestion: TimHashtagOption
): string {
  console.group('buildTextAfterSuggestionInsertion');
  console.log('current text = ', currentText);
  console.log('suggestion.value = ', suggestion.value);
  debugger;
  if (!currentText) return suggestion.value;

  const [_, ...groupMatches] = currentText?.match(HASHTAG_REGEX) || [];

  if (noMatches(groupMatches)) {
    return concatCurrentTextAndSuggestion(currentText, suggestion);
  }
  const groupsAndReplaceTemporaryHashTagWithSuggestion = groupMatches?.map(
    (group, index) => {
      if (index == HASHTAG_GROUP_INDEX) {
        return suggestionWithExtraSpace(suggestion);
      }
      return group;
    }
  );

  const newText =
    groupsAndReplaceTemporaryHashTagWithSuggestion?.join('') || '';

  console.log('Returning: ', newText);
  console.groupEnd();
  return newText;
}

function noMatches(groupMatches: string[]) {
  return !groupMatches || groupMatches.length == 0;
}

function concatCurrentTextAndSuggestion(
  currentText: string,
  suggestion: TimHashtagOption
) {
  return `${currentText}${suggestionWithExtraSpace(suggestion)}`;
}

function suggestionWithExtraSpace(suggestion: TimHashtagOption) {
  return `${suggestion.value}&nbsp;`;
}
