import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { ChipColor, ChipSize, IconChipShape } from '../../models';
import { getChipColorClasses } from '../utils/chip-color-classes.util';

@Component({
  selector: 'tim-icon-chip',
  templateUrl: './icon-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimIconChip implements OnInit {
  constructor() {}

  icon = ICONS.CHECK_WHITE;
  @Input() size: ChipSize;
  @Input() shape: IconChipShape;
  @Input() clickable: boolean;
  @Input() set color(color: ChipColor) {
    this.colorClasses = getChipColorClasses(color);
  }

  colorClasses: string;
  ngOnInit(): void {}
}
