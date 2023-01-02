import { Pipe, PipeTransform } from '@angular/core';
import { TimUILinkProps } from '../models/link-props';

@Pipe({
  name: 'linkArrow',
})
export class LinkArrowPipe implements PipeTransform {
  transform(iqairLink: TimUILinkProps): string {
    if (iqairLink.color === 'white' && iqairLink.isHovered)
      return 'assets/icons/arrow-sm-right-outline-gray-300.svg';
    if (iqairLink.disabled) {
      return iqairLink.color === 'white'
        ? 'assets/icons/arrow-sm-right-outline-white.svg'
        : 'assets/icons/arrow-sm-right-outline.svg';
    }

    switch (iqairLink.color) {
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
