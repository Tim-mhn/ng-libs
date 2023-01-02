import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AvatarInitialsColor } from '../models/avatar-initials-color';
import { AvatarShape } from '../models/avatar-shape';
import { BigAvatarSize } from '../models/big-avatar-size';
import { getBigAvatarSizeClass } from '../utils/avatar-size-class.util';
import { getBigAvatarTextClass } from '../utils/avatar-text-class.util';

@Component({
  selector: 'tim-big-avatar-initials',
  templateUrl: './big-avatar-initials.component.html',
})
export class TimUIBigAvatarInitialsComponent implements OnInit, OnChanges {
  @Input() size: BigAvatarSize = 'md';
  @Input() color: AvatarInitialsColor;
  @Input() text: string;
  @Input() shape: AvatarShape = 'circle';

  constructor() {}

  classes: string;

  ngOnInit() {}

  ngOnChanges() {
    const sizeClass = getBigAvatarSizeClass(this.size);
    const textClass = getBigAvatarTextClass(this.size);
    const shapeClass = this.shape === 'square' ? 'rounded-lg' : 'rounded-full';
    this.classes = `${sizeClass} ${textClass} ${shapeClass}`;
  }
}
