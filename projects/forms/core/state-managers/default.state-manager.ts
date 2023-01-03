import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { merge, Subject, Subscription } from 'rxjs';
import { StateManager, StateManagerOptions } from '../models/state-manager';
import { ErrorStateMatcher } from '../entities/error-state-matcher';

/**
 * Emits stateChanges when :
 * - user focuses out of the form component
 * - form is submitted
 * - user updates the value of the control and control has already been visited before
 */
export class DefaultStateManager implements StateManager {
  protected _hasLostFocus = false;

  protected _stateChanges$ = new Subject<void>();
  public readonly stateChanges$ = this._stateChanges$.asObservable();

  private _hasError$ = new Subject<boolean>();
  public readonly hasError$ = this._hasError$.asObservable();

  private subs: Subscription = new Subscription();

  public waitForFocusLostToShowError: boolean = false;

  constructor(
    public control: AbstractControl,
    private _parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    opts?: StateManagerOptions
  ) {
    this.waitForFocusLostToShowError = opts?.waitForFocusLostToShowError;
  }

  public get parent() {
    return this._parent;
  }

  public get hasLostFocus() {
    return this._hasLostFocus;
  }

  public setControl(control: AbstractControl) {
    this.control = control;
  }

  init(): void {
    this._emitHasErrorOnStateChanges();
    this._emitStateChangesOnControlChanges();
    this._emitStateChangesOnFormSubmit();
  }

  private _emitHasErrorOnStateChanges() {
    const stateChangesSub = this._stateChanges$.subscribe(() => {
      const isErrorState = this.errorStateMatcher.isErrorState(this);
      this._hasError$.next(isErrorState);
    });

    this.registerSub(stateChangesSub);
  }

  private _emitStateChangesOnFormSubmit() {
    if (!this._parent) return;
    this.registerSub(
      this._parent?.ngSubmit.subscribe(() => this._stateChanges$.next())
    );
  }

  protected registerSub(sub: Subscription) {
    this.subs.add(sub);
  }

  private _emitStateChangesOnControlChanges() {
    const statusChanges$ = this.control.statusChanges;
    const valueChanges$ = this.control.valueChanges;
    const controlStatusValueChangesSub = merge(
      statusChanges$,
      valueChanges$
    ).subscribe(() => {
      this._stateChanges$.next();
    });

    this.registerSub(controlStatusValueChangesSub);
  }
  public focusLost() {
    this._hasLostFocus = true;
    this._stateChanges$.next();
  }

  destroy(): void {
    this.subs?.unsubscribe();
  }
}
