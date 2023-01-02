import { ExtendedThemeSize } from '@tim-mhn/ng-ui/core';
import { BigAvatarSize } from '../models/big-avatar-size';

const SIZE_CLASSES_MAP: { [size in ExtendedThemeSize]: string } = {
  '2xs': 'w-4 h-4',
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
};

const BIG_AVATAR_SIZE_CLASSES_MAP = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-40 h-40',
};
export function getAvatarSizeClass(size: ExtendedThemeSize) {
  return SIZE_CLASSES_MAP[size];
}

export function getBigAvatarSizeClass(size: BigAvatarSize) {
  return BIG_AVATAR_SIZE_CLASSES_MAP[size];
}
