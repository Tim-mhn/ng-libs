import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { LinkColor } from '../../models/link-color';

@Component({
  selector: 'a[tim-arrow-link]',
  templateUrl: './arrow-link.component.html',
})
export class TimUIArrowLink implements OnInit {
  @Input() size: ThemeSize;
  @Input() color: LinkColor = 'primary';
  @Input() inline: boolean;
  isHovered = false;
  @HostBinding('class.pointer-events-none') @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}

  toggleHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }
}
