import { QueryList } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { DefaultStateManager, ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { TimUIOption } from './components';

export class SelectStateManager<T> extends DefaultStateManager {
  constructor(
    _control: AbstractControl,
    _parent: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher
  ) {
    super(_control, _parent, errorStateMatcher);
  }

  private options: QueryList<TimUIOption<T>>;

  /**
   * Make sure to emit when options changes to update the triggerValue accordingly
   * when updating a select control's value and the list of options at the same time
   */
  private _emitOnOptionsChanges() {
    const emitOnOptionsChangesSub = this.options.changes.subscribe(() =>
      this._stateChanges$.next()
    );

    this.registerSub(emitOnOptionsChangesSub);
  }

  public setOptions(opts: QueryList<TimUIOption<T>>) {
    this.options = opts;
    this._emitOnOptionsChanges();
  }
}
