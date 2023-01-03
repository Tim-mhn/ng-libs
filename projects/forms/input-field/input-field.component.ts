import {
  Component,
  ContentChild,
  Input,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExtendedThemeSize } from '@tim-mhn/ng-ui/core';
import { DEFAULT_VALIDATION_ERROR_TO_MESSAGE } from '@tim-mhn/ng-forms/core';
import { TimUIInputHint } from '@tim-mhn/ng-forms/core';
import { TimUIInputLabel } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { ValidationErrorToMessage } from '@tim-mhn/ng-forms/core';
import { STATE_MANAGEABLE_TOKEN } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'iqair-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: [],
})
export class TimUIInputField implements OnInit, AfterContentInit {
  hasLabel = false;
  showError$: Observable<boolean>;
  showHint$: Observable<boolean>;
  /**
   * Whether to show an error message or not
   */
  @Input() readonly showErrorMessage: boolean = true;
  /**
   * Map object to set the error message to display based on the Control's errors
   */
  @Input() errorMessageMap = DEFAULT_VALIDATION_ERROR_TO_MESSAGE;
  @Input() textSize: Extract<ExtendedThemeSize, '2xs' | 'xs' | 'sm'> = 'sm';
  @Input() name: string;

  constructor() {}

  @ContentChild(TimUIInputLabel)
  label: TimUIInputLabel;

  @ContentChild(TimUIInputHint)
  hint: TimUIInputHint;

  @ContentChild(STATE_MANAGEABLE_TOKEN) input: StateManageable;

  ngOnInit(): void {}

  updateErrorMessageMap(errorMessageMap: ValidationErrorToMessage) {
    this.errorMessageMap = {
      ...this.errorMessageMap,
      ...errorMessageMap,
    };
  }

  ngAfterContentInit(): void {
    this.hasLabel = !!this.label;

    this.showError$ =
      this.input?.stateManager?.hasError$?.pipe(
        map((hasError) => hasError && this.showErrorMessage)
      ) || of(false);
  }
}
