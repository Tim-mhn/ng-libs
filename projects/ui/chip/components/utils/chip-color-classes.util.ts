import { ChipColor } from '../../models';
const COLOR_CLASSES: { [c in ChipColor]: string } = {
  primary: 'text-blue-600 bg-blue-50',
  neutral: 'text-gray-600 bg-gray-100',
  success: 'text-green-600 bg-green-50',
  destructive: 'text-red-600 bg-red-50',
  warn: 'text-yellow-600 bg-yellow-50',
  'success-darker': 'text-white bg-green-500',
  'neutral-darker': 'bg-gray-500 text-white',
  'primary-darker': 'bg-blue-500 text-white',
};

const CHIP_ICON_COLOR_CLASSES: { [c in ChipColor]: string } = {
  primary: 'bg-blue-500',
  neutral: 'bg-gray-500',
  success: 'bg-green-500',
  destructive: 'bg-red-500',
  warn: 'bg-yellow-500',
  'success-darker': 'bg-green-700',
  'neutral-darker': 'bg-gray-700 ',
  'primary-darker': 'bg-blue-700 ',
};

export function getChipColorClasses(
  c: ChipColor,
  component: 'default' | 'icon' = 'default'
): string {
  const colorClassesMap =
    component == 'icon' ? CHIP_ICON_COLOR_CLASSES : COLOR_CLASSES;
  return colorClassesMap[c] || colorClassesMap.primary;
}
