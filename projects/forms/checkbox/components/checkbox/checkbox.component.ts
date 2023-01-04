import {
  Component,
  ElementRef,
  Input,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DEFAULT_VALIDATION_ERROR_TO_MESSAGE } from '@tim-mhn/ng-forms/core';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { CheckboxIcon, CheckboxSize } from '../../models';

/**
 * How to use :
 *
 * - Simple checkbox with no text
 *
 * ```
 * <-checkbox formControlName="..."></-checkbox>
 * ```
 *
 * - Checkbox with text on the right
 *
 *
 * ```
 * <-checkbox formControlName="...">Insert some text here</-checkbox>
 * ```
 *
 *
 * - Checkbox with text and subText
 *
 * ```
 * <-checkbox formControlName="...">
 *  Insert some text here
 *  <span checkboxSubtext> Insert some description here </span>
 * </-checkbox>
 * ```
 * */
@Component({
  selector: 'tim-checkbox',
  templateUrl: './checkbox.component.html',
})
export class TimCheckbox
  extends BaseControlValueAccessor<boolean>
  implements StateManageable
{
  constructor(
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() public override ngControl: NgControl
  ) {
    super(ngControl);
  }
  stateManager: StateManager;

  @Input() size: CheckboxSize = 'xs';
  @Input() errorMessageMap = DEFAULT_VALIDATION_ERROR_TO_MESSAGE;
  /**
   * Name of the field to be used in error messages
   */
  @Input() name: string = '';
  @Input() icon: CheckboxIcon = 'check';
  @Input() alignText: 'center' | 'top';
  @ViewChild('contentContainer', { read: ElementRef, static: true })
  private _content: ElementRef<HTMLDivElement>;
  public hasFocus = false;
  hasError$: Observable<boolean>;
  hovered = false;

  public hasContent: boolean;

  setHover(isHovered: boolean) {
    this.hovered = isHovered;
  }

  ngOnInit() {
    this.setStateManager();
    this.stateManager?.init();
    this.hasError$ = this.stateManager?.hasError$;
    this.hasContent = !!this._content.nativeElement.textContent;
  }
  setStateManager() {
    if (this.ngControl)
      this.stateManager = new DefaultStateManager(
        this.ngControl.control,
        this.parent,
        this.errorStateMatcher
      );
  }
  handleClick(e: Event) {
    const { checked } = <HTMLInputElement>e.target;
    this.setValue(checked);
  }

  onFocusChange(hasFocus: boolean) {
    this.stateManager.focusLost();
    this.hasFocus = hasFocus;
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.stateManager.destroy();
  }
}
