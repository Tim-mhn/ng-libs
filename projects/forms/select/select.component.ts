/* eslint-disable no-unused-expressions */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { EMPTY, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { ICONS } from '@tim-mhn/common/icons';
import { DropdownPosition } from '@tim-mhn/ng-ui/dropdown-menu';
import {
  DEFAULT_VALIDATION_ERROR_TO_MESSAGE,
  handleFocusLost,
  MultiOptionControlUtil,
} from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { CanUseCustomCompareFn } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { TimOption } from './components';
import { ClickableContentChildrenParent } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { SelectStateManager } from './select.state-manager';

@Component({
  selector: 'tim-select',
  templateUrl: './select.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimSelect)],
})
export class TimSelect<T = any>
  extends ClickableContentChildrenParent<TimOption<T>>
  implements
    OnInit,
    AfterContentInit,
    ControlValueAccessor,
    OnDestroy,
    StateManageable,
    CanUseCustomCompareFn<T>
{
  public readonly ARROW_UP_SRC = 'assets/icons/chevron-up-outline-gray-500.svg';
  public readonly ARROW_DOWN_SRC =
    'assets/icons/chevron-down-outline-gray-500.svg';
  public readonly ARROW_UP_BLUE_SRC =
    'assets/icons/chevron-up-outline-blue-500.svg';
  public readonly ARROW_DOWN_BLUE_SRC =
    'assets/icons/chevron-down-outline-blue-500.svg';

  public readonly PLUS_SRC = ICONS.PLUS_BLUE;

  overlayPositions = [
    DropdownPosition['below-start'],
    DropdownPosition['above-start'],
    DropdownPosition['below-end'],
    DropdownPosition['above-end'],
  ];

  @Input() placeholder: string;
  @Input() errorMessageMap = DEFAULT_VALIDATION_ERROR_TO_MESSAGE;
  @Input() name: string;
  @Input() multiple = false;
  @Input() variant: 'outline' | 'simple' = 'outline';
  @Input() fixedTriggerLabel: string;
  @Input() icon: 'plus' | 'arrow' = 'arrow';
  @Input() set compareFn(compareFn: (a: T, b: T) => boolean) {
    this.multiOptionControlUtil.updateCompareFn(compareFn);
  }

  @Input() defaultWidth = true;
  @Input() sameWidthAsTrigger = false;
  @Input() showErrorMessage = true;
  @ContentChildren(forwardRef(() => TimOption), { descendants: true })
  protected children: QueryList<TimOption<T>>;

  @ViewChild('widthWrapper')
  widthWrapper: ElementRef<HTMLElement>;

  private _value: T | T[];

  public get value() {
    return this._value;
  }

  multiOptionControlUtil = new MultiOptionControlUtil<T>();

  public isOptionSelected(option: TimOption<T>): boolean {
    if (this.multiple) {
      return this.multiOptionControlUtil.isOptionSelectedFromArray(
        option,
        this._value as T[]
      );
    }
    return this.multiOptionControlUtil.isOptionSelectedFromSingleValue(
      option,
      this._value as T
    );
  }

  public isOpen = false;
  public isDisabled = false;
  public triggerValue: any;
  public hasError = false;
  /**
   * use to show specific style when value is not null / empty array
   */
  public isActive: boolean;

  private _onDestroy$ = new Subject<void>();
  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() public ngControl: NgControl,
    public elementRef: ElementRef
  ) {
    super();
    if (ngControl) {
      // eslint-disable-next-line no-param-reassign
      ngControl.valueAccessor = this;
    }
  }
  stateManager: SelectStateManager<T>;

  active: boolean;
  setStateManager() {
    this.stateManager = new SelectStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher
    );
  }
  public toggle() {
    this.isOpen ? this.close() : this.open();
  }

  public close() {
    if (!this.isOpen) return;
    this._markAsTouchedAndFocusLost();
    this.isOpen = false;
  }

  private _markAsTouchedAndFocusLost() {
    handleFocusLost(this.ngControl, this.stateManager);
  }

  public open() {
    if (this.canOpen) this.isOpen = true;
  }

  private get canOpen() {
    return !this.isDisabled && !this.isOpen;
  }

  onOptionSelection(option: TimOption<T>, init: boolean) {
    // If this this is the initial onOptionSelection call, option is undefined and we can directly use this._value
    if (!init) this._updateValueOnOptionSelection(option);

    this._selectDeselectOptions();
    if (!this.multiple) this.close();
    if (init && this._valueIsNullOrEmptyArray()) return;
    this.onChange(this._value);
  }

  private _valueIsNullOrEmptyArray() {
    return this.multiple ? (<T[]>this._value)?.length === 0 : !this._value;
  }

  private _updateValueOnOptionSelection(option: TimOption) {
    const value = option.value;

    if (this.multiple) {
      if (this.notNullOrUndefined(value)) {
        this._value = this.multiOptionControlUtil.getNewValueOnOptionClick(
          option,
          this._value as T[]
        );
      }
    } else {
      this._value = value;
    }
  }

  private notNullOrUndefined(v: any) {
    return !(v === null || v === undefined);
  }

  private async _setTriggerValue() {
    if (this.fixedTriggerLabel) {
      this.triggerValue = this.fixedTriggerLabel;
      return;
    }
    const options = await this.childrenWhenAvailable();
    const selectedOptions = options?.filter((opt) => opt.selected);

    this.triggerValue =
      selectedOptions?.length > 0
        ? selectedOptions
            .map((opt) => opt.viewValue)
            .reduce((prev, curr) => `${prev && `${prev}, `}${curr}`, '')
        : this.placeholder;
  }

  /**
   * Mark children options as selected or unselected depending on current value
   */
  private _selectDeselectOptions() {
    this.childrenWhenAvailable().then(() => {
      this.children?.forEach((opt) => {
        const optSelected = this.isOptionSelected(opt);
        optSelected ? opt.markAsSelected() : opt.markAsUnselected();
      });
    });
  }

  writeValue(value: T | T[]): void {
    this._value = value;
    this._selectDeselectOptions();
    this._setTriggerValue().then();
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
    this.isDisabled = isDisabled;
  }

  hasError$: Observable<boolean>;
  ngOnInit() {
    if (this.ngControl) this.setStateManager();
    this.triggerValue = this.placeholder;
    this._updateTriggerValueOnStateChanges();
    this.stateManager?.init();
    this.hasError$ = this.stateManager?.hasError$;
    this.stateManager?.stateChanges$?.subscribe();
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this._updateStateOnOptionSelection();
    this.stateManager?.setOptions(this.children);
  }

  private _updateTriggerValueOnStateChanges() {
    this.stateManager?.stateChanges$
      .pipe(startWith(EMPTY), takeUntil(this._onDestroy$))
      .subscribe(async () => {
        this._updateIsActive();
        await this._setTriggerValue();
      });
  }

  private _updateIsActive() {
    this.isActive =
      this._value instanceof Array ? this._value?.length > 0 : !!this._value;
  }

  /**
   * Listen to children Option onSelectionChange$ Observable and update state of Select and other options
   */
  private _updateStateOnOptionSelection() {
    // Emits the new option that has been selected
    const optionSelection$ = this.childClicked$;

    const newValue$ = optionSelection$.pipe(
      // map((opt) => opt.value),
      takeUntil(this._onDestroy$),
      map((option) => ({ option, init: false })),
      startWith({ option: null, init: true })
    );

    newValue$.subscribe(({ option, init }) => {
      this.onOptionSelection(option, init);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this.stateManager?.destroy();
  }
}
