import { ThemeColor } from '@tim-mhn/ng-ui/core';

export type ChipColor =
  | Exclude<ThemeColor, 'white'>
  | 'success-darker'
  | 'primary-darker'
  | 'neutral-darker';
