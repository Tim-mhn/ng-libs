import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ExtendedThemeSize } from '@tim-mhn/ng-ui/core';
import { AvatarShape } from '../models/avatar-shape';
import { getAvatarSizeClass } from '../utils/avatar-size-class.util';

@Component({
  selector: 'tim-avatar-profile-image',
  templateUrl: './avatar-profile-image.component.html',
})
export class AvatarProfileImageComponent implements OnInit, OnChanges {
  @Input() src: string | ArrayBuffer;
  @Input() size: ExtendedThemeSize;
  @Input() shape: AvatarShape = 'circle';
  @Input() border = true;

  classes: string;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {
    const shapeClass = this._getShapeClass();
    const sizeClass = this.size
      ? getAvatarSizeClass(this.size)
      : 'w-full h-full';
    this.classes = `${sizeClass} ${shapeClass}`;
  }

  private _getShapeClass() {
    if (this.shape === 'square')
      return this.size === '2xl' ? 'rounded-xl' : 'rounded-lg';
    return 'rounded-full';
  }
}
