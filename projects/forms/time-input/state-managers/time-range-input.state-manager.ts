import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { combineLatest, filter, skip, startWith, take } from 'rxjs';
import { ErrorStateMatcher, DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { TimEndTimeDirective } from '../directives/end-time.directive';
import { TimStartTimeDirective } from '../directives/start-time.directive';

export class TimeRangeInputStateManager extends DefaultStateManager {
  private _startTime: TimStartTimeDirective;
  private _endTime: TimEndTimeDirective;

  constructor(
    control: AbstractControl,
    _parent: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher
  ) {
    super(control, _parent, errorStateMatcher);
  }

  public setStartEndTimes(
    startTime: TimStartTimeDirective,
    endTime: TimEndTimeDirective
  ) {
    this._startTime = startTime;
    this._endTime = endTime;

    const focusLostSub = combineLatest([
      this._startTime.timeInput.focusChange$.pipe(startWith(false)),
      this._endTime.timeInput.focusChange$.pipe(startWith(false)),
    ])
      .pipe(
        skip(1), // skip initial [false, false] value from startWith
        filter(([startFocused, endFocused]) => !startFocused && !endFocused),
        take(1)
      )
      .subscribe(() => {
        this.focusLost();
      });

    this.registerSub(focusLostSub);
  }
}
