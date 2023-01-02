import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TimUIDropdownMenu } from '../components/dropdown-menu/dropdown-menu.component';
import { TimUIDropdownTriggerClickEvent } from '../entities/trigger-click-event';
import { TimUIDropdownMenuClickEvent } from '../entities/menu-click-event';
import { TimUIDropdownTriggerCloseEvent } from '../entities/trigger-close-event';

@Directive({
  selector: '[iqairDropdownTrigger]',
  host: {
    '(click)': '_handleClick($event)',
    class: 'cursor-pointer',
  },
})
export class TimUIDropdownTrigger
  extends CdkOverlayOrigin
  implements OnChanges
{
  constructor(public el: ElementRef<HTMLElement>) {
    super(el);
  }

  private _id = this._randomId();
  public get id() {
    return this._id;
  }

  @Input('iqairDropdownMenuTriggerFor') menu: TimUIDropdownMenu;
  @Input('iqairDropdownMenuTriggerCloseOnClick') closeOnClick = true;
  ngOnChanges() {
    this.menu?.setTrigger(this);
  }

  _handleClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleMenu();
    this._dispatchTriggerClickEvent();
  }

  private _dispatchTriggerClickEvent() {
    const triggerClickEvent = new TimUIDropdownTriggerClickEvent(this.id);
    this.el.nativeElement.dispatchEvent(triggerClickEvent);
  }

  private _dispatchTriggerCloseEvent() {
    const triggerCloseEvent = new TimUIDropdownTriggerCloseEvent(this.id);
    this.el.nativeElement.dispatchEvent(triggerCloseEvent);
  }

  private _randomId() {
    return Math.floor(Math.random() * 10e12).toString(16);
  }

  toggleMenu() {
    // eslint-disable-next-line no-unused-expressions
    if (this.menu.isOpen && this.closeOnClick) {
      this.closeMenu();
    } else if (!this.menu.isOpen) {
      this.openMenu();
    }
  }

  public closeMenu() {
    this.menu.close();
    this._dispatchTriggerCloseEvent();
  }

  public openMenu() {
    this.menu.open();
  }

  @HostListener('document:tim-dropdown-trigger-click', ['$event'])
  onTriggerClick(e: TimUIDropdownTriggerClickEvent) {
    // if click is triggered by itself, do not do anything: open/close is handled in _handleClick
    if (e.triggerId === this.id) return;
    // close dropdown-menu if another one is opened
    if (this.menu.isOpen) this.closeMenu();
  }

  @HostListener('document:tim-dropdown-menu-click', ['$event'])
  onMenuClick(e: TimUIDropdownMenuClickEvent) {
    if (e.triggerId === this.id && !this.menu.closeOnMenuClick) return;
    if (this.menu.isOpen) this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick() {
    if (this.menu.isOpen) this.closeMenu();
  }
}
