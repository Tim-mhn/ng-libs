import { Component, Input, OnInit } from '@angular/core';
import { DayOfWeek } from '@tim-mhn/common/date';

@Component({
  selector: 'day-circle',
  templateUrl: './day-circle.component.html',
})
export class DayCircleComponent implements OnInit {
  @Input() selected: boolean;
  @Input() day: DayOfWeek;
  @Input() disabled: boolean;
  constructor() {}

  ngOnInit() {}
}
