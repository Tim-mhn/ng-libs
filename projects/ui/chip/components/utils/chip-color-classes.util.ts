import { ChipColor } from '../../models';
const COLOR_CLASSES: { [c in ChipColor]: string } = {
  primary: 'text-blue-600 bg-blue-50',
  neutral: 'text-gray-600 bg-gray-100',
  success: 'text-green-600 bg-green-50',
  destructive: 'text-red-600 bg-red-50',
  warn: 'text-yellow-600 bg-yellow-50',
  'success-darker': 'text-green-800 bg-green-200',
  'neutral-darker': 'bg-gray-500 text-white',
  'primary-darker': 'bg-blue-500 text-white',
};
export function getChipColorClasses(c: ChipColor): string {
  return COLOR_CLASSES[c] || COLOR_CLASSES.primary;
}
