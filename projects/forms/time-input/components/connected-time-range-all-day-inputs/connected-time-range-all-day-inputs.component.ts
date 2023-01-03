import {
  AfterViewInit,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { delay, merge, of, Subject, takeUntil } from 'rxjs';
import { TimeOfDay } from '@tim-mhn/common/date';
import { TimUITimeRangeInputComponent } from '../time-range-input/time-range-input.component';
import { TimUITimeRangeAllDayDirective } from '../../directives/time-range-all-day.directive';

@Component({
  selector: 'iqair-connected-time-range-all-day-inputs',
  templateUrl: './connected-time-range-all-day-inputs.component.html',
})
export class TimUIConnectedTimeRangeAllDayInputsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ContentChild(TimUITimeRangeInputComponent)
  private timeRangeInput: TimUITimeRangeInputComponent;

  @ContentChild(TimUITimeRangeAllDayDirective)
  private allDayInput: TimUITimeRangeAllDayDirective;

  constructor() {}

  private readonly onDestroy$ = new Subject<void>();
  ngOnInit() {}

  ngAfterViewInit(): void {
    this._updateStartEndTimeOnAllDayChange();
  }

  private _updateStartEndTimeOnAllDayChange() {
    if (!this.allDayInput) {
      console.error(
        'Could not find All Day Input. Make sure to use the iqairTimeRangeAllDay directive selector in the allDay checkbox'
      );
      return;
    }
    const allDayCtrl = this.allDayInput.control;

    const startTimeCtrl = this.timeRangeInput.startTime.control;
    const endTimeCtrl = this.timeRangeInput.endTime.control;

    // delay(0) to avoid ExpressionChangedAfterChecked Error
    const allDayCtrlInitialValue$ = of(allDayCtrl.value).pipe(delay(0));
    merge(allDayCtrlInitialValue$, allDayCtrl.valueChanges)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((allDay) => {
        if (allDay) {
          startTimeCtrl.setValue(TimeOfDay.startOfDay());
          endTimeCtrl.setValue(TimeOfDay.endOfDay());

          startTimeCtrl.disable();
          endTimeCtrl.disable();
        } else {
          startTimeCtrl.enable();
          endTimeCtrl.enable();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
