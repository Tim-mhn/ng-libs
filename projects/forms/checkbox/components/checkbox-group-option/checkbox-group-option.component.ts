import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TimControlOption } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'tim-checkbox-group-option',
  templateUrl: './checkbox-group-option.component.html',
})
export class TimCheckboxGroupOptionComponent<T>
  implements OnInit, TimControlOption<T>
{
  selected: boolean;
  @Input() value: T;
  disabled: boolean;

  private _clicked$ = new Subject<this>();
  clicked$ = this._clicked$.asObservable();
  constructor() {}

  markAsSelected() {
    this.selected = true;
  }

  markAsUnselected() {
    this.selected = false;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  onClick() {
    if (this.disabled) return;
    this.selected = !this.selected;
    this._clicked$.next(this);
  }
}
