import { Pipe, PipeTransform } from '@angular/core';
import { AlertColor } from '../models/color';

@Pipe({
  name: 'alertBgClass',
})
export class AlertBgClassPipe implements PipeTransform {
  transform(color: AlertColor = 'primary'): string {
    const PRIMARY_BG = 'bg-blue-50';
    const COLOR_TO_BG_MAP: { [key in AlertColor]: string } = {
      primary: PRIMARY_BG,
      destructive: 'bg-red-50',
      success: 'bg-green-50',
      warn: 'bg-yellow-50',
    };

    return COLOR_TO_BG_MAP[color] || PRIMARY_BG;
  }
}
