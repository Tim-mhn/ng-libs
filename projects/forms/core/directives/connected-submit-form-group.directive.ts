import { Directive, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[formGroup]',
})
export class ConnectedSubmitFormGroupDirective implements OnDestroy {
  private _onDestroy$ = new Subject<void>();
  constructor(
    @Self() private formGroupDirective: FormGroupDirective,
    @Optional() @SkipSelf() private parentFormGroupDirective: FormGroupDirective
  ) {
    if (this.parentFormGroupDirective) this._propagateNgSubmitToSubFormGroup();
  }

  private _propagateNgSubmitToSubFormGroup() {
    this.parentFormGroupDirective.ngSubmit
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((event) => {
        this.formGroupDirective.onSubmit(event);
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
