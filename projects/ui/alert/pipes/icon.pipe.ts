import { Pipe, PipeTransform } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { ICONS } from '@tim-mhn/common/icons';
import { AlertColor } from '../models/color';

@Pipe({
  name: 'alertIcon',
})
export class AlertIconPipe implements PipeTransform {
  private readonly INFO_ICON_SRC =
    'assets/icons/information-circle-solid-blue-500.svg';
  private readonly ERROR_ICON_SRC = ICONS.EXCLAMATION_CIRCLE_RED;
  private readonly WARN_ICON_SRC =
    'assets/icons/exclamation-solid-yellow-500.svg';
  private readonly SUCCESS_ICON_SRC = ICONS.CHECK_CIRCLE_GREEN;

  private COLOR_TO_ICON_MAP: { [key in AlertColor]: string } = {
    primary: this.INFO_ICON_SRC,
    destructive: this.ERROR_ICON_SRC,
    warn: this.WARN_ICON_SRC,
    success: this.SUCCESS_ICON_SRC,
  };
  transform(color: AlertColor = 'primary'): unknown {
    // default to primary icon if wrong color input
    return this.COLOR_TO_ICON_MAP[color] || this.COLOR_TO_ICON_MAP.primary;
  }
}
