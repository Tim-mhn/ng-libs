import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonToggleVariant } from '../models/button-toggle-variant';

@Component({
  selector: 'iqair-button-toggle',
  templateUrl: './button-toggle.component.html',
  host: {
    class: 'flex flex-1',
    '[attr.disabled]': 'disabled || null',
  },
})
export class ButtonToggleComponent<T> implements OnInit {
  @Input() value: T;

  setVariant(v: ButtonToggleVariant) {
    this.isStroked = v === 'stroked';
    this.isRaised = v === 'raised';
  }

  isStroked = true;
  isRaised = false;

  private _onSelectionChange$ = new Subject<ButtonToggleComponent<T>>();
  onSelectionChange$ = this._onSelectionChange$.asObservable();
  public selected: boolean;

  constructor() {}

  public markAsSelected() {
    this.selected = true;
  }

  public markAsUnselected() {
    this.selected = false;
  }

  isDisabled: boolean;
  public setIsDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onClick() {
    if (!this.isDisabled) this._onSelectionChange$.next(this);
  }

  ngOnInit() {}
}
