import { Component, Input, OnInit } from '@angular/core';
import { BigAvatarSize } from '../models/big-avatar-size';
import { AvatarShape } from '../models/avatar-shape';
import { getBigAvatarSizeClass } from '../utils/avatar-size-class.util';
import { getBigAvatarTextClass } from '../utils/avatar-text-class.util';

@Component({
  selector: 'tim-big-avatar-profile-image',
  templateUrl: './big-avatar-profile-image.component.html',
})
export class TimUIBigAvatarProfileImageComponent implements OnInit {
  @Input() src: string | ArrayBuffer;
  @Input() border: boolean = true;
  @Input() size: BigAvatarSize = 'md';
  @Input() shape: AvatarShape = 'circle';

  classes: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    const sizeClass = getBigAvatarSizeClass(this.size);
    const textClass = getBigAvatarTextClass(this.size);
    const shapeClass = this.shape === 'square' ? 'rounded-lg' : 'rounded-full';
    this.classes = `${sizeClass} ${textClass} ${shapeClass}`;
  }
}
