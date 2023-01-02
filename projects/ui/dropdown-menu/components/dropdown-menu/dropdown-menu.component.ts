import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DropdownPosition } from '../../constants/positions.constants';
import { TimUIDropdownTrigger } from '../../directives/dropdown-trigger.directive';
import { TimUIDropdownMenuClickEvent } from '../../entities/menu-click-event';
import { TimUIDropdownPosition } from '../../models/positions';

@Component({
  selector: 'tim-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  exportAs: 'iqairMenu',
})
export class TimUIDropdownMenu implements OnInit {
  trigger: TimUIDropdownTrigger;

  public setTrigger(trigger: TimUIDropdownTrigger) {
    this.trigger = trigger;
  }

  overlayPositions = [
    DropdownPosition['below-start'],
    DropdownPosition['below-end'],
    DropdownPosition['above-end'],
  ];

  @Input() set position(pos: TimUIDropdownPosition) {
    this.overlayPositions = [DropdownPosition[pos]];
  }
  @Input() menuClass: string = '';
  @Input() sameWidthAsTrigger = false;
  @Input() closeOnMenuClick = true;
  @Input() overrideDefaultMaxHeight = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
  isOpen = false;

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  onClick(e: Event) {
    e.stopPropagation();
    const menuClickEvent = new TimUIDropdownMenuClickEvent(this.trigger.id);
    this.el.nativeElement.dispatchEvent(menuClickEvent);
  }
}
