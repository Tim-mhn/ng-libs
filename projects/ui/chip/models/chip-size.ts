import { ExtendedThemeSize, ThemeSize } from '@tim-mhn/ng-ui/core';

export type ChipSize = Exclude<ExtendedThemeSize, 'xs' | '2xs'>;
