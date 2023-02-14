import { TimHashtagOption } from '../models';

export function filterOptionsToShow<T extends TimHashtagOption>(
  options: T[],
  input: string
) {
  if (!input) return options;
  return options?.filter((opt) => showOption(opt, input));
}

function showOption(option: TimHashtagOption, input: string) {
  return option?.value?.toLowerCase().startsWith(input);
}
