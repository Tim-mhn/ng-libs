import { ThemeColor } from '@tim-mhn/ng-ui/core';

export type LinkColor = Exclude<ThemeColor, 'warn' | 'success'>;
