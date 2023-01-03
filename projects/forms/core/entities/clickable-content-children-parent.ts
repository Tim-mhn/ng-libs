import { AfterContentInit, Directive, QueryList } from '@angular/core';
import {
  firstValueFrom,
  merge,
  Observable,
  ReplaySubject,
  startWith,
  switchMap,
} from 'rxjs';
import { TimUIControlOption } from '../models/control-option';

@Directive()
export abstract class ClickableContentChildrenParent<
  ChildComponent extends TimUIControlOption
> implements AfterContentInit
{
  protected abstract children: QueryList<ChildComponent>;
  private _afterContentInit$ = new ReplaySubject<void>();

  ngAfterContentInit(): void {
    this._afterContentInit$.next();
  }

  protected async childrenWhenAvailable() {
    await firstValueFrom(this._afterContentInit$);
    return this.children;
  }

  protected get childClicked$() {
    const children$ = this.children.changes.pipe(
      startWith(this.children)
    ) as Observable<QueryList<ChildComponent>>;

    return children$.pipe(
      switchMap((children) => merge(...children.map((child) => child.clicked$)))
    );
  }
}
