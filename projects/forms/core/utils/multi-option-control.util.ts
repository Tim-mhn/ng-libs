import { CompareFn } from '../models/compare-function';
import { TimUIControlOption } from '../models/control-option';

export class MultiOptionControlUtil<T> {
  getNewValueOnOptionClick(option: TimUIControlOption<T>, currentValue: T[]) {
    const { value: optionValue, selected } = option;
    if (selected) return this._appendValue(optionValue, currentValue);
    return this._removeValue(optionValue, currentValue);
  }

  isOptionSelectedFromArray(option: TimUIControlOption<T>, currentValues: T[]) {
    const el = currentValues.find((v) => this._areEqual(v, option.value));
    // To prevent value 0 to be considered as falsy
    return el !== undefined;
  }

  isOptionSelectedFromSingleValue(
    option: TimUIControlOption<T>,
    currentValue: T
  ) {
    return this._areEqual(option.value, currentValue);
  }

  private _compareFn: CompareFn<T>;

  public updateCompareFn(compareFn: CompareFn<T>) {
    this._compareFn = compareFn;
  }
  private _appendValue(valueToAdd: T, currentValues: T[]) {
    return [...currentValues, valueToAdd];
  }

  private _removeValue(valueToRemove: T, currentValues: T[]) {
    return currentValues.filter((v) => !this._areEqual(v, valueToRemove));
  }

  private _defaultEqual: CompareFn<any> = (a: any, b: any) => a === b;
  /**
   * If a custom @property compareFn has been provided, use it. Otherwise use the default equality comparator
   */
  private get _areEqual() {
    return this._compareFn || this._defaultEqual;
  }
}
