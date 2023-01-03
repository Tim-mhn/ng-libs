import { Directive, OnDestroy, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseControlValueAccessor<T>
  implements ControlValueAccessor, OnDestroy
{
  protected readonly _onDestroy$ = new Subject<void>();

  public isDisabled = false;

  public value!: T;

  constructor(@Optional() public ngControl: NgControl) {
    // eslint-disable-next-line no-param-reassign
    if (ngControl) ngControl.valueAccessor = this;
  }

  /**
   * Angular callback to propagate UI input change -> Form Model data update
   * @param v
   */
  setValue(v: T) {
    if (this.isDisabled) return; // dont set value on disabled controls
    this.value = v;
    this.onChange(v);
    this.onTouched();
  }

  // Save the callbacks, make sure to have a default so your app
  // doesn't crash when one isn't (yet) registered
  // eslint-disable-next-line no-unused-vars
  protected onChange = (v: T) => {};

  protected onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Angular callback to propagate Form Model data update -> UI
   */
  writeValue(v: T): void {
    this.value = v;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
