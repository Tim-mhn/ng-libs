import { ThemeColor } from '@tim-mhn/ng-ui/core';

export type SpinnerColor = Extract<
  ThemeColor,
  'neutral' | 'white' | 'destructive'
>;
