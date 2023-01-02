import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
} from '@angular/core';

import {
  TimUIPrefix,
  TimUISuffix,
  ThemeColor,
  ThemeSize,
} from '@tim-mhn/ng-ui/core';
import { map, startWith, Subject, takeUntil } from 'rxjs';
import { SpinnerColor } from '@tim-mhn/ng-ui/spinner';
import { ButtonIcon } from './models/button-icon';
import { ButtonType } from './models/button-type';

@Component({
  selector:
    'button[tim-flat-button], button[tim-faint-button], button[tim-simple-button], button[tim-stroked-button]',
  host: {
    '[attr.disabled]': 'disabled || loading || null',
    class: 'outline-none',
  },
  templateUrl: './button.component.html',
})
export class TimUIButton
  implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy
{
  @Input() color: ThemeColor = 'primary';
  @Input() size: ThemeSize = 'xs';
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() iconBtn: ButtonIcon;

  @ContentChildren(TimUIPrefix) private _prefixList: QueryList<TimUIPrefix>;
  @ContentChildren(TimUISuffix) private _suffixList: QueryList<TimUISuffix>;
  hasPrefix: boolean;
  hasSuffix: boolean;

  readonly buttonType: ButtonType = this.getButtonType();
  spinnerColor: SpinnerColor = 'white';
  focused: boolean;

  private readonly onDestroy$ = new Subject<void>();

  @HostListener('focus') onFocus() {
    this.focused = true;
  }
  @HostListener('focusout') onFocusOut() {
    this.focused = false;
  }

  constructor(
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(ch: SimpleChanges) {
    if (ch?.color) this._setSpinnerColor();
  }

  ngAfterContentInit(): void {
    this._prefixList.changes
      .pipe(
        startWith(this._prefixList),
        map(() => !!this._prefixList.first),
        takeUntil(this.onDestroy$)
      )
      .subscribe((hasPrefix) => (this.hasPrefix = hasPrefix));

    this._suffixList.changes
      .pipe(
        startWith(this._suffixList),
        map(() => !!this._suffixList.first),
        takeUntil(this.onDestroy$)
      )
      .subscribe((hasSuffix) => (this.hasSuffix = hasSuffix));
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  private _getHostElement() {
    return this._elementRef.nativeElement;
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  private getButtonType(): ButtonType {
    if (this._hasHostAttributes('tim-faint-button')) return 'tim-faint-button';
    if (this._hasHostAttributes('tim-simple-button'))
      return 'tim-simple-button';
    if (this._hasHostAttributes('tim-stroked-button'))
      return 'tim-stroked-button';

    return 'tim-flat-button';
  }

  private _setSpinnerColor() {
    if (this.color === 'white') {
      this.spinnerColor = 'white';
    } else if (
      this.buttonType === 'tim-faint-button' ||
      this.buttonType === 'tim-simple-button' ||
      this.color === 'neutral'
    ) {
      this.spinnerColor = 'neutral';
    } else if (
      this.buttonType === 'tim-stroked-button' &&
      this.color === 'destructive'
    ) {
      this.spinnerColor = 'destructive';
    } else {
      this.spinnerColor = 'white';
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
