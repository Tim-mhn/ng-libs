import { AfterContentInit, Component, Input, ViewChild } from '@angular/core';
import { InputType } from '@tim-mhn/ng-forms/input';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { TimInput } from '@tim-mhn/ng-forms/input';

@Component({
  selector: 'tim-password-input',
  templateUrl: './password-input.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimPasswordInput)],
})
export class TimPasswordInput implements AfterContentInit, StateManageable {
  public readonly EYE_OPEN_ICON_SRC = 'assets/icons/eye-outline-24px.svg';
  public readonly EYE_CLOSED_ICON_SRC = 'assets/icons/eye-outline-off-24px.svg';

  @Input() placeholder: string = '';
  @Input() name = 'Password';
  @Input() flexWidth = false;

  // static: true to have input defined on ngOnInit
  @ViewChild(TimInput, { static: true }) readonly input: TimInput;

  constructor() {}

  ngAfterContentInit() {
    this._setStateManagerFromChildInput();
  }

  stateManager: StateManager;
  _setStateManagerFromChildInput() {
    this.stateManager = this.input.stateManager;
  }

  readonly InputTypeEnum = InputType;

  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
