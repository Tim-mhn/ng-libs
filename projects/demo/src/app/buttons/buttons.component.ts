import { Component, OnInit } from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { ButtonSize } from '../../../../ui/button/models/button-size';
@Component({
  selector: 'demo-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  public readonly PLUS_OUTLINE_WHITE = ICONS.PLUS_WHITE;
  public readonly PLUS_OUTLINE_BLACK = ICONS.PLUS_BLACK;
  public readonly PLUS_OUTLINE_BLUE = ICONS.PLUS_BLUE;
  public readonly PLUS_OUTLINE_GRAY = ICONS.PLUS_GRAY;
  public readonly PLUS_OUTLINE_RED = ICONS.PLUS_RED;
  constructor() {}

  readonly SIZES: ButtonSize[] = ['2xs', 'xs', 'sm', 'md', 'lg'];
  ngOnInit(): void {}
}
