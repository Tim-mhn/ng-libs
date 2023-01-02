import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import {
  firstValueFrom,
  ReplaySubject,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { TimUITabComponent } from '../tab/tab.component';

@Component({
  selector: 'tim-tab-group',
  templateUrl: './tab-group.component.html',
})
export class TimUITabGroupComponent<T extends string = string>
  implements AfterContentInit, OnDestroy
{
  @Input() tabHeaderClass: string | string[] = '';
  @Input() grow: boolean;

  @ContentChildren(forwardRef(() => TimUITabComponent), { descendants: true })
  public tabs: QueryList<TimUITabComponent<T>>;

  private lastActiveTab: T;

  private activeTab: T;
  @Input('activeTab') set _activeTab(tab: T) {
    this.activeTab = tab;
    this.tabsWhenAvailable().then(() =>
      this.selectTabAndUnselectOthers(tab, { emit: false })
    );
  }
  @Output() activeTabChange = new EventEmitter<T>();

  private readonly onDestroy$ = new Subject<void>();
  private _afterContentInit$ = new ReplaySubject<void>();

  selectTabAndUnselectOthers(
    tabKey: T,
    opts: { emit: boolean } = { emit: true }
  ) {
    this.tabs.forEach((tab) => {
      if (tab.key === tabKey) tab.markAsSelected();
      else tab.markAsUnselected();
    });

    if (opts?.emit) this._updateAndEmitSelectedTab(tabKey);
  }

  private _updateAndEmitSelectedTab(newSelectedTabKey: T) {
    if (this.lastActiveTab !== newSelectedTabKey) {
      this.lastActiveTab = newSelectedTabKey;
      this.activeTabChange.emit(this.lastActiveTab);
    }
  }
  constructor() {}

  ngAfterContentInit(): void {
    this._afterContentInit$.next();
    this._selectFirstTabByDefault();
  }

  private _selectFirstTabByDefault() {
    if (this.activeTab) return;
    this.tabs.changes
      .pipe(startWith(this.tabs), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.selectTabAndUnselectOthers(this.tabs.first.key);
      });
  }

  /**
   * Get tabs once AfterContentInit lifecycle has run
   */
  async tabsWhenAvailable() {
    await firstValueFrom(this._afterContentInit$);
    return this.tabs;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
