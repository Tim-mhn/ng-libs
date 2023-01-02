import { Component, Input, OnInit } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';

@Component({
  selector: '[tim-base-link]',
  templateUrl: './base-link.component.html',
  host: {
    class: 'max-w-full',
  },
})
export class TimUIBaseLink implements OnInit {
  @Input() size: ThemeSize = 'md';
  @Input() inline: boolean;

  constructor() {}

  ngOnInit(): void {}
}
