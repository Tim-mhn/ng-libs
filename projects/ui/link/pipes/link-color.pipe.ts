import { Pipe, PipeTransform } from '@angular/core';
import { TimUILinkProps } from '../models/link-props';

@Pipe({
  name: 'linkColor',
})
export class LinkColorPipe implements PipeTransform {
  transform(timLink: TimUILinkProps): string {
    if (timLink.disabled) {
      return timLink.color === 'white'
        ? 'text-white opacity-20'
        : 'text-black opacity-20';
    }

    switch (timLink.color) {
      case 'primary':
        return 'text-blue-500 hover:text-blue-600';
      case 'neutral':
        return 'text-gray-500 hover:text-gray-600';
      case 'destructive':
        return 'text-red-500 hover:text-red-600';
      case 'white':
        return 'text-white hover:text-gray-300';
      default:
        return 'text-blue-500 hover:text-blue-600';
    }
  }
}
