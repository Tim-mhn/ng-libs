import { Pipe, PipeTransform } from '@angular/core';
import { TimUILinkProps } from '../models/link-props';

@Pipe({
  name: 'linkArrow',
})
export class LinkArrowPipe implements PipeTransform {
  transform(timLink: TimUILinkProps): string {
    if (timLink.color === 'white' && timLink.isHovered)
      return 'assets/icons/arrow-sm-right-outline-gray-300.svg';
    if (timLink.disabled) {
      return timLink.color === 'white'
        ? 'assets/icons/arrow-sm-right-outline-white.svg'
        : 'assets/icons/arrow-sm-right-outline.svg';
    }

    switch (timLink.color) {
      case 'primary':
        return 'assets/icons/arrow-sm-right-outline-blue-500.svg';
      case 'neutral':
        return 'assets/icons/arrow-sm-right-outline-gray-500.svg';
      case 'white':
        return 'assets/icons/arrow-sm-right-outline-white.svg';
      default:
        return 'assets/icons/arrow-sm-right-outline-blue-500.svg';
    }
  }
}
