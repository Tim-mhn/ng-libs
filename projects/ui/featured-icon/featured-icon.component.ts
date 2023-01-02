import { Component, Input, OnInit } from '@angular/core';
import { FeaturedIconColor } from './models/color';
import { FeaturedIconSize } from './models/size';
import { FeaturedIconVariant } from './models/variant';

@Component({
  selector: 'featured-icon',
  templateUrl: './featured-icon.component.html',
})
export class FeaturedIconComponent implements OnInit {
  @Input() src: string;
  @Input() size: FeaturedIconSize = 'md';
  @Input() variant: FeaturedIconVariant = 'circle';
  @Input() color: FeaturedIconColor = 'primary';

  constructor() {}

  ngOnInit() {}
}
