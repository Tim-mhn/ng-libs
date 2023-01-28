import { Component, OnInit } from '@angular/core';
import { ChipColor, ChipSize, IconChipShape } from '@tim-mhn/ng-ui/chip';

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
}
