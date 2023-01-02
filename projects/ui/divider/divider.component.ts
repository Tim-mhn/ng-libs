import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tim-divider',
  templateUrl: './divider.component.html',
})
export class TimUIDivider implements OnInit {
  @Input() color: 'white' | 'black' = 'black';
  @Input() vertical = false;
  constructor() {}

  ngOnInit() {}
}
