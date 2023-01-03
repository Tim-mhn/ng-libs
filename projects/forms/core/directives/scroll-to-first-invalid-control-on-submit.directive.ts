import {
  Directive,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SkipSelf,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ScrollableToControlDirective } from './scrollable-to-control.directive';

@Directive({
  selector: '[formGroup]',
})
export class ScrollToFirstInvalidControlOnSubmitDirective
  implements OnInit, OnDestroy
{
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Optional()
    @SkipSelf()
    private _parent: ScrollToFirstInvalidControlOnSubmitDirective,
    @Self() private _fgd: FormGroupDirective
  ) {}

  ngOnInit() {
    if (this.isParentForm) this._scrollToFirstInvalidControlOnSubmit();
  }

  private get isParentForm() {
    return this._parent === null;
  }

  private _scrollToFirstInvalidControlOnSubmit() {
    this._fgd.ngSubmit.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this._fgd?.invalid) {
        const firstInvalidControl = this.controls.find((c) => c.invalid);
        firstInvalidControl?.scrollTo();
      }
    });
  }

  private controls: ScrollableToControlDirective[] = [];

  public addControl(c: ScrollableToControlDirective) {
    this.isParentForm ? this.controls.push(c) : this._parent.addControl(c);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
