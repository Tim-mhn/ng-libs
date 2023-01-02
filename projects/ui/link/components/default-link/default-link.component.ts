import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { LinkColor } from '../../models/link-color';

@Component({
  selector: 'a[tim-link], tim-link',
  templateUrl: './default-link.component.html',
})
export class TimUIDefaultLink implements OnInit {
  @Input() size: ThemeSize;
  @Input() color: LinkColor = 'primary';
  @Input() inline: boolean;
  @HostBinding('class.pointer-events-none') @Input() disabled: boolean;
  constructor() {}

  ngOnInit(): void {}
}
