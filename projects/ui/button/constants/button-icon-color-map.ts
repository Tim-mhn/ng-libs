// eslint-disable-next-line import/no-unresolved
import { ICONS } from '@tim-mhn/common/icons';
import { ButtonIcon } from '../models/button-icon';

type IconToSrc = {
  base?: string;
  black?: string;
  white?: string;
  gray?: string;
  red?: string;
  blue?: string;
};

export const ButtonIconColorMap: { [key in ButtonIcon]: IconToSrc } = {
  plus: {
    black: ICONS.PLUS_BLACK,
    white: ICONS.PLUS_WHITE,
    gray: ICONS.PLUS_GRAY,
    red: ICONS.PLUS_RED,
    blue: ICONS.PLUS_BLUE,
  },
  dots: {
    base: ICONS.VERTICAL_DOTS,
  },
  horizontalDots: {
    base: ICONS.HORIZONTAL_DOTS,
  },
  pen: {
    base: ICONS.PENCIL_GRAY,
  },
  maximize: {
    base: ICONS.MAXIMIZE,
  },
  cross: {
    base: ICONS.X_GRAY,
  },
} as const;
