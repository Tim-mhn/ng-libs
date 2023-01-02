import { Component, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { AvatarShape } from '../models/avatar-shape';

@Component({
  selector: 'tim-avatar-label-group',
  templateUrl: './avatar-label-group.component.html',
})
export class AvatarLabelGroupComponent implements OnInit {
  @Input() src: string;
  @Input() size: ThemeSize = 'md';
  @Input() flexWidth: boolean;
  @Input() shape: AvatarShape = 'circle';

  constructor() {}

  ngOnInit(): void {}
}
