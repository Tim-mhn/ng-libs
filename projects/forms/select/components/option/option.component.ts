import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ICONS } from '@tim-mhn/common/icons';
import { TimUIPrefix } from '@tim-mhn/ng-forms/core';
import { TimControlOption } from '@tim-mhn/ng-forms/core';
import { TimSelect } from '../../select.component';

@Component({
  selector: 'tim-option',
  templateUrl: './option.component.html',
})
export class TimOption<T = any> implements OnInit, TimControlOption<T> {
  constructor(
    private _element: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    @Inject(forwardRef(() => TimSelect)) private _parent: TimSelect
  ) {}
  public _selected = false;

  public multiple: boolean;

  @Input() value: T;
  @Input() disabled = false;
  @ContentChild(TimUIPrefix) prefix: TimUIPrefix;
  public readonly CHECK_IMG_PATH = ICONS.CHECK_BLUE;

  private _onSelectionChange = new Subject<this>();
  public clicked$ = this._onSelectionChange.asObservable();

  ngOnInit(): void {
    this.multiple = this._parent.multiple;
    this._selected = this._parent.isOptionSelected(this);
  }

  public get selected() {
    return this._selected;
  }
  public markAsSelected() {
    this._selected = true;
    this.cdr.detectChanges();
  }

  public markAsUnselected() {
    this._selected = false;
    this.cdr.detectChanges();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this._onSelectionChange.next(this);
  }
  /** Gets the host DOM element. */
  private _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  public get viewValue() {
    return this._getHostElement()?.textContent;
  }

  handleClick() {
    // eslint-disable-next-line no-unused-expressions
    this._selected ? this.markAsUnselected() : this.markAsSelected();
    this._emitSelectionChangeEvent();
  }
}
