import { ExtendedThemeSize } from '@tim-mhn/ng-ui/core';
import { BigAvatarSize } from '../models/big-avatar-size';

const TEXT_CLASSES_MAP: { [size in ExtendedThemeSize]: string } = {
  '2xs': 'text-[8px] leading-3',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const BIG_AVATAR_TEXT_CLASSES_MAP = {
  sm: 'text-5xl',
  md: 'text-7xl',
  lg: 'text-8xl',
};

export function getAvatarTextClass(size: ExtendedThemeSize) {
  return TEXT_CLASSES_MAP[size];
}

export function getBigAvatarTextClass(size: BigAvatarSize) {
  return BIG_AVATAR_TEXT_CLASSES_MAP[size];
}
