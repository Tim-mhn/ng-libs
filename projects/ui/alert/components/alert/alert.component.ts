/* eslint-disable import/no-extraneous-dependencies */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { ComponentDismisser } from '@tim-mhn/ng-ui/core';
import { ICONS } from '@tim-mhn/common/icons';
import { AlertColor } from '../../models/color';
import { TimUIAlertAction } from '../../directives/alert-action.directive';
import { TimUIAlertDescription } from '../../directives/alert-description.directive';

@Component({
  selector: 'tim-alert',
  templateUrl: './alert.component.html',
})
export class TimUIAlert implements AfterViewInit {
  public readonly CLOSE_ICON_SRC = ICONS.X_GRAY;

  @Input() dismissible = false;
  @Input() color: AlertColor;
  @Input() smallPadding = false;

  @ContentChild(TimUIAlertDescription) description: TimUIAlertDescription;
  @ContentChildren(TimUIAlertAction, { descendants: true })
  actions: QueryList<TimUIAlertAction>;

  constructor(
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    private dismisser: ComponentDismisser
  ) {}

  dismiss() {
    this.dismisser.dismiss(this.host);
  }

  // Call detectChanges to prevent the ExpressionChangedAfterItHasBeenCheckedError
  // This is caused by the following:
  // the TimUIActions's template is only accessible on ngAfterViewInit (ViewChild)
  // and will change the Alert component template in this lifecycle hook
  // Without this detectChanges,
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
