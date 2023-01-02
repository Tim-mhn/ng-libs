import { ThemeColor } from '@tim-mhn/ng-ui/core';

export type FeaturedIconColor = Extract<
  ThemeColor,
  'primary' | 'success' | 'warn' | 'destructive' | 'neutral'
>;
