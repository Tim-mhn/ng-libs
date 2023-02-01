import { Component, OnInit } from '@angular/core';
import {
  ChipColor,
  ChipIcon,
  ChipSize,
  IconChipShape,
} from '@tim-mhn/ng-ui/chip';
import { zipTwoArrays } from '@tim-mhn/common/objects';

@Component({
  selector: 'demo-chips',
  templateUrl: './chips.component.html',
})
export class ChipsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  readonly SIZES: ChipSize[] = ['sm', 'md', 'lg'];
  readonly COLORS: ChipColor[] = [
    'primary',
    'primary-darker',
    'destructive',
    'neutral',
    'neutral-darker',
    'success',
    'success-darker',
    'warn',
  ];

  readonly SHAPES: IconChipShape[] = ['circle', 'square'];
  readonly ICONS: ChipIcon[] = ['check', 'circle', 'repair', 'cross'];

  readonly ICON_CHIPS_OPTIONS: {
    clickable: boolean;
    shape: IconChipShape;
    icon: ChipIcon;
  }[] = [false, true].flatMap((clickable, clickableIndex) => {
    const tmpOptions = this.SHAPES.map((shape, shapeIdex) => {
      const iconIndex = 2 * clickableIndex + shapeIdex;
      const icon = this.ICONS[iconIndex];
      return { clickable, shape, icon };
    });
    return tmpOptions;
  });
}
