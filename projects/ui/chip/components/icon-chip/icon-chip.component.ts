import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { ChipColor, ChipIcon, ChipSize, IconChipShape } from '../../models';
import { getChipColorClasses } from '../utils/chip-color-classes.util';

@Component({
  selector: 'tim-icon-chip',
  templateUrl: './icon-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimIconChip implements OnInit {
  constructor() {}

  icon: string = ICONS.CHECK_WHITE;
  @Input() size: ChipSize = 'md';
  @Input() shape: IconChipShape = 'circle';
  @Input() clickable: boolean;
  @Input() set color(color: ChipColor) {
    this.colorClasses = getChipColorClasses(color, 'icon');
  }

  @Input('icon') set _icon(icon: ChipIcon) {
    this._setIcon(icon);
  }

  colorClasses: string;

  private _setIcon(icon: ChipIcon) {
    const iconMap = {
      check: ICONS.CHECK_WHITE,
      cross: ICONS.X_WHITE,
      circle: ICONS.CIRCLE_WHITE,
      repair: ICONS.REPAIR,
    };

    this.icon = iconMap[icon] || ICONS.CHECK_WHITE;
  }
  ngOnInit(): void {}
}
