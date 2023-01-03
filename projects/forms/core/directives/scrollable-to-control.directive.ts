import { Directive, ElementRef, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ScrollToFirstInvalidControlOnSubmitDirective } from './scroll-to-first-invalid-control-on-submit.directive';

@Directive({
  selector: '[formControlName],[formControl]',
})
export class ScrollableToControlDirective implements OnInit {
  constructor(
    @Self() private _ngControl: NgControl,
    @Optional()
    private parentForm: ScrollToFirstInvalidControlOnSubmitDirective,
    private _el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.parentForm?.addControl(this);
  }

  public get invalid() {
    return this._ngControl.control.invalid;
  }

  public scrollTo() {
    this._el.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}
