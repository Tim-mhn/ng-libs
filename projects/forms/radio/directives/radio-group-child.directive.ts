import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { TimControlOption } from '@tim-mhn/ng-forms/core';

@Directive({
  selector: 'radio-group-child', // not used as directive
})
export abstract class RadioGroupChild<T> implements TimControlOption<T> {
  constructor() {}

  selected: boolean;

  @Input() value: T;

  private _checkedChange$ = new Subject<this>();
  public clicked$ = this._checkedChange$.asObservable();

  hovered: boolean;
  focused: boolean;
  setHovered(isHovered: boolean) {
    this.hovered = isHovered;
  }

  setFocused(isFocused: boolean) {
    this.focused = isFocused;
  }

  public emitCheckedChange(checked: boolean) {
    this.selected = checked;
    if (checked) this._checkedChange$.next(this);
  }

  check() {
    this.selected = true;
  }

  uncheck() {
    this.selected = false;
  }

  disabled: boolean;

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  setDisabled = () => (this.disabled = !this.disabled);
}
