import { Pipe, PipeTransform } from '@angular/core';
import { ChipColor } from '../models/chip-color';
import { TimUIChipProps } from '../models/chip-props';

@Pipe({
  name: 'chipClass',
})
export class ChipClassPipe implements PipeTransform {
  transform(iqairChip: TimUIChipProps): string {
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
    const SIZE_CLASSES = {
      sm: 'px-2',
      md: 'px-2.5',
      lg: 'px-3',
    };

    const colorClasses =
      COLOR_CLASSES[iqairChip.color] || COLOR_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[iqairChip.size] || SIZE_CLASSES.md;
    const hoverClass = this._getHoverClass(iqairChip);

    return `${colorClasses} ${sizeClass} ${hoverClass}`;
  }

  private _getHoverClass(iqairChip: TimUIChipProps) {
    const HOVER_CLASSES: { [key in ChipColor]: string } = {
      primary: 'hover:bg-blue-200',
      neutral: 'hover:bg-gray-200',
      success: 'hover:bg-green-200',
      destructive: 'hover:bg-red-200',
      warn: 'hover:bg-yellow-200',
      'primary-darker': 'hover:bg-blue-800',
      'neutral-darker': 'hover:bg-gray-800',
      'success-darker': '',
    };
    const hoverClass =
      iqairChip.clickable || iqairChip.withAction
        ? HOVER_CLASSES[iqairChip.color]
        : '';
    return iqairChip.clickable ? `cursor-pointer ${hoverClass}` : hoverClass;
  }
}
