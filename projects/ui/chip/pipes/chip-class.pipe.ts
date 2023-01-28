import { Pipe, PipeTransform } from '@angular/core';
import { getChipColorClasses } from '../components/utils/chip-color-classes.util';
import { ChipColor } from '../models/chip-color';
import { TimUIChipProps } from '../models/chip-props';

@Pipe({
  name: 'chipClass',
})
export class ChipClassPipe implements PipeTransform {
  transform(timChip: TimUIChipProps): string {
    const SIZE_CLASSES = {
      sm: 'px-2',
      md: 'px-2.5',
      lg: 'px-3',
    };

    const colorClasses = getChipColorClasses(timChip.color);
    const sizeClass = SIZE_CLASSES[timChip.size] || SIZE_CLASSES.md;
    const hoverClass = this._getHoverClass(timChip);

    return `${colorClasses} ${sizeClass} ${hoverClass}`;
  }

  private _getHoverClass(timChip: TimUIChipProps) {
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
      timChip.clickable || timChip.withAction
        ? HOVER_CLASSES[timChip.color]
        : '';
    return timChip.clickable ? `cursor-pointer ${hoverClass}` : hoverClass;
  }
}
