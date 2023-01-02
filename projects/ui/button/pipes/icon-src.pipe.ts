import { Pipe, PipeTransform } from '@angular/core';
import { ThemeColor } from '@tim-mhn/ng-ui/core';
import { ButtonIconColorMap } from '../constants/button-icon-color-map';
import { ButtonIcon } from '../models/button-icon';
import { ButtonType } from '../models/button-type';

@Pipe({
  name: 'iconSrc',
})
export class IconSrcPipe implements PipeTransform {
  transform(
    type: ButtonType,
    icon: ButtonIcon,
    color: ThemeColor,
    disabled: boolean
  ): string {
    const iconsMap = ButtonIconColorMap[icon];
    if (iconsMap.base) return iconsMap.base;
    if (disabled) return iconsMap.black;

    switch (type) {
      case 'tim-simple-button':
        if (color === 'neutral') return iconsMap.gray;
        if (color === 'primary') return iconsMap.blue;
        if (color === 'destructive') return iconsMap.red;
        return iconsMap.white;

      case 'tim-flat-button':
        return iconsMap.white;

      case 'tim-faint-button':
        if (color === 'destructive') return iconsMap.red;
        return iconsMap.blue;

      case 'tim-stroked-button':
        if (color === 'neutral') return iconsMap.gray;
        if (color === 'destructive') return iconsMap.red;
        return iconsMap.white;

      default:
        return iconsMap.white;
    }
  }
}
