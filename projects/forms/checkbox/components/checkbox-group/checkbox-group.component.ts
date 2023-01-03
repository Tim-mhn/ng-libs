/* eslint-disable no-unused-vars */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  Optional,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ClickableContentChildrenParent } from '@tim-mhn/ng-forms/core';
import { CanUseCustomCompareFn, CompareFn } from '@tim-mhn/ng-forms/core';
import { MultiOptionControlUtil } from '@tim-mhn/ng-forms/core';
import { TimUICheckboxGroupOptionComponent } from '../checkbox-group-option/checkbox-group-option.component';

@Component({
  selector: 'iqair-checkbox-group',
  templateUrl: './checkbox-group.component.html',
})
export class TimUICheckboxGroupComponent<T>
  extends ClickableContentChildrenParent<TimUICheckboxGroupOptionComponent<T>>
  implements
    OnInit,
    AfterContentInit,
    ControlValueAccessor,
    CanUseCustomCompareFn<T>
{
  @Input() set compareFn(compareFn: CompareFn<T>) {
    this.multiOptionControlUtil.updateCompareFn(compareFn);
  }
  @ContentChildren(TimUICheckboxGroupOptionComponent, { descendants: true })
  protected children: QueryList<TimUICheckboxGroupOptionComponent<T>>;

  private _value: T[] = [];

  constructor(@Optional() public ngControl: NgControl) {
    super();
    // eslint-disable-next-line no-param-reassign
    ngControl.valueAccessor = this;
  }

  private multiOptionControlUtil = new MultiOptionControlUtil<T>();

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this._updateStateOnOptionSelection();
  }

  private _updateStateOnOptionSelection() {
    const checkboxClicked$ = this.childClicked$;

    checkboxClicked$.subscribe((clickedCheckbox) => {
      const newValue = this.multiOptionControlUtil.getNewValueOnOptionClick(
        clickedCheckbox,
        this._value
      );
      this._value = newValue;
      this.onChange(newValue);

      this._selectDeselectCheckboxes();
    });
  }

  writeValue(values: T[]): void {
    this._value = values;
    this._selectDeselectCheckboxes();
  }

  private _selectDeselectCheckboxes() {
    this.childrenWhenAvailable().then((checkboxes) => {
      checkboxes.forEach((checkbox) => {
        const markCheckboxAsSelected =
          this.multiOptionControlUtil.isOptionSelectedFromArray(
            checkbox,
            this._value
          );
        markCheckboxAsSelected
          ? checkbox.markAsSelected()
          : checkbox.markAsUnselected();
      });
    });
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
    this.childrenWhenAvailable().then((checkboxes) =>
      checkboxes.forEach((c) => c.setDisabledState(isDisabled))
    );
  }

  ngOnInit() {}
}
