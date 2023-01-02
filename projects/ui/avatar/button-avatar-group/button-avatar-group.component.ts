import { Component, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';

@Component({
  selector: 'button[tim-button-avatar-group]',
  templateUrl: './button-avatar-group.component.html',
  host: {
    '[attr.disabled]': 'disabled || null',
    class: 'w-max h-fit outline-none',
  },
})
export class ButtonAvatarGroupComponent implements OnInit {
  @Input() src: string;
  @Input() size: ThemeSize = 'md';

  @Input() disabled: boolean;

  public readonly ARROW_DOWN_ICON =
    'assets/icons/cheveron-sm-down-outline-gray-400.svg';
  constructor() {}

  ngOnInit(): void {}
}
