/* eslint-disable no-param-reassign */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BASE_AVATAR_PLACEHOLDER_SRC } from '../constants/base-avatar-placeholder-src.constant';

@Component({
  selector: 'tim-base-avatar-profile-image',
  templateUrl: './base-avatar-profile-image.component.html',
})
export class TimUIBaseAvatarProfileImageComponent implements OnInit {
  @Input() src: string | ArrayBuffer;
  @Input() border: boolean = true;
  @Input() classes: string;
  @ViewChild('baseAvatarImg', { static: true })
  baseAvatarImg: ElementRef<HTMLImageElement>;

  constructor() {}

  ngOnInit() {
    const imgEl = this.baseAvatarImg.nativeElement;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = BASE_AVATAR_PLACEHOLDER_SRC;
    };
  }
}
