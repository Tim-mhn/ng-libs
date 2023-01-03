import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'iqair-calendar-table-header',
  templateUrl: './calendar-table-header.component.html',
})
export class TimUICalendarTableHeaderComponent implements OnInit {
  @Input() dayLabels: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor() {}

  ngOnInit() {}
}
