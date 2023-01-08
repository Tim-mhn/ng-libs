import { Component, Input, Optional, ViewChild } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import {
  BaseControlValueAccessor,
  DefaultStateManager,
  ErrorStateMatcher,
  StateManageable,
  stateManageableProvider,
  StateManager,
} from '@tim-mhn/ng-forms/core';
import {
  Observable,
  startWith,
  takeUntil,
  combineLatest,
  ReplaySubject,
} from 'rxjs';
import { TimInput, InputType } from '@tim-mhn/ng-forms/input';
import { EditableChipType } from './models/editable-chip-type';
import { TypedFormBuilder } from '@tim-mhn/common/typed-forms';
import { ChipColor } from '@tim-mhn/ng-ui/chip';

@Component({
  selector: 'tim-editable-chip',
  templateUrl: './editable-chip.component.html',
  providers: [stateManageableProvider(TimEditableChip)],
  host: {
    class: 'w-fit',
  },
})
export class TimEditableChip
  extends BaseControlValueAccessor<number>
  implements StateManageable
{
  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() public override ngControl: NgControl,
    private tfb: TypedFormBuilder
  ) {
    super(ngControl);
  }

  readonly DEFAULT_COLOR: ChipColor = 'neutral';

  @Input() type: EditableChipType = InputType.NUMBER;
  @Input('color') set inputColor(color: ChipColor) {
    this._inputColor$.next(color || this.DEFAULT_COLOR);
  }
  @ViewChild(TimInput, { static: true })
  readonly input: TimInput;

  stateManager: StateManager;
  hasError$: Observable<boolean>;
  editMode = false;

  inputControl = this.tfb.control(null);

  color: ChipColor;
  ngOnInit() {
    this._setAndInitStateManager();
    this.hasError$ = this.stateManager?.hasError$;
    this._updateColorBasedOnErrorState();
  }

  private _inputColor$ = new ReplaySubject<ChipColor>();

  private _updateColorBasedOnErrorState() {
    const hasError$ = this.hasError$.pipe(startWith(false));
    const inputColor$ = this._inputColor$.pipe(startWith(this.DEFAULT_COLOR));
    combineLatest({ hasError: hasError$, inputColor: inputColor$ })
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(({ hasError, inputColor }) => {
        this.color = hasError ? 'destructive' : inputColor;
      });
  }

  private _setAndInitStateManager() {
    if (this.ngControl)
      this.stateManager = new DefaultStateManager(
        this.ngControl.control,
        this.parent,
        this.errorStateMatcher
      );
    this.stateManager.init();
  }

  override writeValue(v: number) {
    super.writeValue(v);
    this.inputControl.setValue(v);
  }

  activateEditMode() {
    if (this.isDisabled) return;
    this.toggleEditMode(true);
  }

  confirmChanges() {
    this.toggleEditMode(false);
    this.setValue(this.input.value);
  }
  cancelChanges() {
    this.toggleEditMode(false);
    this.inputControl.setValue(this.value);
  }
  toggleEditMode = (active: boolean) => (this.editMode = active);

  updateValue() {
    this.toggleEditMode(false);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }
}
