import { Component, Input, OnInit } from '@angular/core';
import { AvatarInitialsColor } from '../models/avatar-initials-color';

@Component({
  selector: 'tim-base-avatar-initials',
  templateUrl: './base-avatar-initials.component.html',
})
export class TimUIBaseAvatarInitialsComponent implements OnInit {
  @Input() color: AvatarInitialsColor = 'primary';
  @Input() classes: string;
  @Input() text: string;
  constructor() {}

  ngOnInit() {}
}
