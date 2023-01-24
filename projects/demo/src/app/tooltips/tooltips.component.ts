import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-tooltips',
  templateUrl: './tooltips.component.html',
})
export class TooltipsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showTooltip = false;
  toggleShowTooltip = () => (this.showTooltip = !this.showTooltip);
}
