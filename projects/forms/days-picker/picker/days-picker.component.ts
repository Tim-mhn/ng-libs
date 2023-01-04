import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayOfWeek, WEEK_DAYS } from '@tim-mhn/common/date';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ALL_DAYS_OF_WEEK } from '@tim-mhn/common/date';

@Component({
  selector: 'tim-days-picker',
  templateUrl: './days-picker.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimDaysPickerComponent)],
})
export class TimDaysPickerComponent
  extends BaseControlValueAccessor<DayOfWeek[]>
  implements OnInit, StateManageable, OnDestroy
{
  readonly DAYS = ALL_DAYS_OF_WEEK;

  stateManager: StateManager;
  hasError$: Observable<boolean>;

  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() ngControl: NgControl
  ) {
    super(ngControl);
  }

  ngOnInit() {
    if (this.ngControl) this.setStateManager();
  }

  override writeValue(days: DayOfWeek[]): void {
    super.writeValue(days || []);
  }

  setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher
    );
    this.hasError$ = this.stateManager.hasError$;
    this.stateManager.init();
  }

  private _isSelected = (day: DayOfWeek) => this.value.includes(day);

  onDayClicked(day: DayOfWeek) {
    if (!this.stateManager.hasLostFocus) {
      this.stateManager.focusLost();
    }
    const updatedSelectedDays = this._isSelected(day)
      ? this.value.filter((d) => d !== day)
      : [...this.value, day];

    const updatedSortedSelectedDays =
      this._sortSelectedDays(updatedSelectedDays);

    this.setValue(updatedSortedSelectedDays);
  }

  private _sortSelectedDays(days: DayOfWeek[]) {
    return days.sort((d1, d2) => WEEK_DAYS.indexOf(d1) - WEEK_DAYS.indexOf(d2));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }
}
