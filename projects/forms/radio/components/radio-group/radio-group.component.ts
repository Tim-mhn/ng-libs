import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  ClickableContentChildrenParent,
  MultiOptionControlUtil,
} from '@tim-mhn/ng-forms/core';
import { CanUseCustomCompareFn, CompareFn } from '@tim-mhn/ng-forms/core';
import { RadioGroupChild } from '../../directives';

@Component({
  selector: 'iqair-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      /* eslint-disable no-use-before-define */
      useExisting: forwardRef(() => TimUIRadioGroupComponent),
    },
  ],
})
export class TimUIRadioGroupComponent<T = any>
  extends ClickableContentChildrenParent<RadioGroupChild<T>>
  implements
    OnInit,
    ControlValueAccessor,
    AfterContentInit,
    OnDestroy,
    CanUseCustomCompareFn<T>
{
  constructor() {
    super();
  }

  @Input() set compareFn(customCompareFn: CompareFn<T>) {
    this.multiOptionControlUtil.updateCompareFn(customCompareFn);
  }

  @ContentChildren(forwardRef(() => RadioGroupChild), {
    descendants: true,
  })
  protected children: QueryList<RadioGroupChild<T>>;
  private _onDestroy$ = new Subject<void>();

  _value: T;

  multiOptionControlUtil = new MultiOptionControlUtil<T>();

  writeValue(value: T): void {
    this._value = value;
    this._checkUncheckRadios();
  }

  private _checkUncheckRadios() {
    this.childrenWhenAvailable().then((radios) => {
      radios.forEach((r) => {
        const isSelected =
          this.multiOptionControlUtil.isOptionSelectedFromSingleValue(
            r,
            this._value
          );
        isSelected ? r.check() : r.uncheck();
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
  setDisabledState?(isDisabled: boolean): void {
    this.childrenWhenAvailable().then((radios) =>
      radios.forEach((r) => r.setDisabledState(isDisabled))
    );
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

    const radioChecked$ = this.childClicked$;

    radioChecked$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((radioChecked) => {
        this.onChange(radioChecked.value);
        this._value = radioChecked.value;
        this._checkUncheckRadios();
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
