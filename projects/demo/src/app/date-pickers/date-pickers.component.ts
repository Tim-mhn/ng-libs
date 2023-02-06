import { Component, OnInit } from '@angular/core';
import { DateRange } from '@tim-mhn/ng-forms/date-range-picker';
import { TypedFormBuilder } from '@tim-mhn/common/typed-forms';
@Component({
  selector: 'demo-date-pickers',
  templateUrl: './date-pickers.component.html',
})
export class DatePickersComponent implements OnInit {
  constructor(private tfb: TypedFormBuilder) {}

  dateRangePickerCtrl = this.tfb.control<DateRange>(null);
  ngOnInit(): void {}
}
