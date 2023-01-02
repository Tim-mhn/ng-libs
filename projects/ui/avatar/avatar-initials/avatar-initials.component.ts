import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ExtendedThemeSize } from '@tim-mhn/ng-ui/core';
import { AvatarInitialsColor } from '../models/avatar-initials-color';
import { AvatarShape } from '../models/avatar-shape';
import { getAvatarSizeClass } from '../utils/avatar-size-class.util';
import { getAvatarTextClass } from '../utils/avatar-text-class.util';

@Component({
  selector: 'tim-avatar-initials',
  templateUrl: './avatar-initials.component.html',
})
export class AvatarInitialsComponent implements OnInit, OnChanges {
  @Input() size: ExtendedThemeSize = 'xs';
  @Input() shape: AvatarShape = 'circle';
  @Input() color: AvatarInitialsColor = 'primary';
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}

  classes: string;
  ngOnChanges() {
    const sizeClass = getAvatarSizeClass(this.size);
    const textClass = getAvatarTextClass(this.size);
    const shapeClass = this._getShapeClass(this.size, this.shape);
    this.classes = `${sizeClass} ${textClass} ${shapeClass}`;
  }

  private _getShapeClass(size: ExtendedThemeSize, shape: AvatarShape) {
    if (shape === 'circle') return 'rounded-full';
    return size === '2xs' ? 'rounded' : 'rounded-lg';
  }
}
