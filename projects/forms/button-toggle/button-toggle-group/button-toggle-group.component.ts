import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { firstValueFrom, merge, ReplaySubject } from 'rxjs';
import { EmitOnUserChange } from '@tim-mhn/ng-forms/core';
import { ButtonToggleComponent } from '../button-toggle/button-toggle.component';
import { ButtonToggleVariant } from '../models/button-toggle-variant';

@Component({
  selector: 'tim-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
})
export class ButtonToggleGroupComponent<T>
  implements
    OnInit,
    ControlValueAccessor,
    AfterContentInit,
    EmitOnUserChange<T>
{
  @ContentChildren(ButtonToggleComponent) private buttonToggles: QueryList<
    ButtonToggleComponent<T>
  >;

  _variant: ButtonToggleVariant = 'stroked';

  @Input() set variant(_variant: ButtonToggleVariant) {
    this._variant = _variant;
    this.toggleButtonsWhenAvailable().then((buttons) =>
      buttons.forEach((button) => button.setVariant(_variant))
    );
  }

  private _value: T;
  private _afterContentInit$ = new ReplaySubject<void>();
  @Output() userChange = new EventEmitter<T>();

  constructor(public ngControl: NgControl) {
    // eslint-disable-next-line no-param-reassign
    ngControl.valueAccessor = this;
  }

  ngAfterContentInit(): void {
    this._afterContentInit$.next();
    const buttonSelectionChange$ = merge(
      ...this.buttonToggles.map((toggle) => toggle.onSelectionChange$)
    );
    buttonSelectionChange$.subscribe((selectedButton) => {
      this._value = selectedButton.value;
      this.userChange.emit(this._value);
      this.onChange(this._value);
      this.updateButtonsSelection();
    });
  }

  private isButtonSelected(buttonToggle: ButtonToggleComponent<T>): boolean {
    return this._value === buttonToggle.value;
  }

  writeValue(value: T): void {
    this._value = value;
    this.updateButtonsSelection();
  }
  // eslint-disable-next-line no-unused-vars
  private onChange = (v: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.toggleButtonsWhenAvailable().then(() =>
      this.buttonToggles.forEach((button) => button.setIsDisabled(isDisabled))
    );
  }

  private updateButtonsSelection() {
    this.toggleButtonsWhenAvailable().then(() =>
      this.buttonToggles.forEach((buttonToggle) => {
        const isSelected = this.isButtonSelected(buttonToggle);
        // eslint-disable-next-line no-unused-expressions
        isSelected
          ? buttonToggle.markAsSelected()
          : buttonToggle.markAsUnselected();
      })
    );
  }

  /**
   * Toggle Buttons are fetched using ContentChildren and are only available from AfterContentInit lifecycle hook
   * Some functions (setDisabledState, setInitialValue) may call the button toggles before that
   * This allows to properly wait for the buttonToggles to exist before calling them
   * @returns
   */
  private async toggleButtonsWhenAvailable() {
    await firstValueFrom(this._afterContentInit$);
    return this.buttonToggles;
  }

  ngOnInit() {}
}
