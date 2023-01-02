import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { LinkColor } from '../../models/link-color';

@Component({
  selector: 'a[tim-underline-link], tim-underline-link',
  templateUrl: './underline-link.component.html',
})
export class TimUIUnderlineLink implements OnInit {
  @Input() size: ThemeSize;
  @Input() color: LinkColor = 'primary';
  @HostBinding('class.pointer-events-none') @Input() disabled: boolean;
  constructor() {}

  ngOnInit(): void {}
}
