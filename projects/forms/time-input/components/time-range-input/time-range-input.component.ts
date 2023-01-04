import {
  AfterContentInit,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import {
  TimUIEndTimeDirective,
  TimUIStartTimeDirective,
} from '../../directives';
import { TimeRangeInputStateManager } from '../../state-managers/time-range-input.state-manager';

@Component({
  selector: 'iqair-time-range-input',
  templateUrl: './time-range-input.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimUITimeRangeInputComponent)],
})
export class TimUITimeRangeInputComponent
  implements AfterContentInit, OnInit, OnDestroy, StateManageable
{
  @ContentChild(TimUIStartTimeDirective)
  public startTime: TimUIStartTimeDirective;

  @ContentChild(TimUIEndTimeDirective)
  public endTime: TimUIEndTimeDirective;

  constructor(
    @Optional() public _controlContainer: ControlContainer,
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher
  ) {}

  private _onDestroy$ = new Subject<void>();

  stateManager: TimeRangeInputStateManager;

  ngOnInit() {
    this.stateManager = new TimeRangeInputStateManager(
      this._controlContainer.control,
      this.parent,
      this.errorStateMatcher
    );
    this.stateManager.init();
  }
  ngAfterContentInit(): void {
    this.stateManager.setStartEndTimes(this.startTime, this.endTime);
    this._jumpToEndTimeOnStartTimeCompletion();
    this._jumpBetweenStartAndEndWithArrows();
  }

  private _jumpToEndTimeOnStartTimeCompletion() {
    this.startTime.validTimeEntered$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        this.endTime.focusOnHours('start');
      });
  }

  private _jumpBetweenStartAndEndWithArrows() {
    this.startTime.jumpToEndTime$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => this.endTime.focusOnHours('start'));

    this.endTime.jumpToStartTime$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        this.startTime.focusOnMinutes('end');
      });
  }

  ngOnDestroy(): void {
    this.stateManager.destroy();
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
