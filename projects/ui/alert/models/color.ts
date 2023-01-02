import { ThemeColor } from '@tim-mhn/ng-ui/core';

export type AlertColor = Exclude<ThemeColor, 'neutral' | 'white'>;
