/* eslint-disable import/no-extraneous-dependencies */
import {
  Component,
  ContentChild,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { TimUIPrefix } from '@tim-mhn/ng-ui/core';
import { TimUIDropdownTrigger } from '@tim-mhn/ng-ui/dropdown-menu';
import { ChipColor } from '../models/chip-color';
import { ChipSize } from '../models/chip-size';

@Component({
  selector: 'tim-chip',
  templateUrl: './chip.component.html',
  host: {
    class: 'overflow-hidden',
  },
})
export class TimUIChip implements OnInit {
  @Input() size: ChipSize = 'md';
  @Input() color: ChipColor = 'primary';
  @Input() withAction: boolean = false;
  @Input() clickable: boolean = false;
  @Output() actionClick = new EventEmitter<void>();
  @Output() chipClick = new EventEmitter<void>();

  public readonly ICON_CROSS = 'assets/icons/ic-cross.svg';

  @ContentChild(TimUIPrefix, { static: true }) private _prefix: TimUIPrefix;
  hasPrefix: boolean;

  constructor(
    @Optional() @Host() private dropdownTrigger: TimUIDropdownTrigger
  ) {}

  ngOnInit(): void {
    this.hasPrefix = !!this._prefix;
  }

  onActionClick(event: Event) {
    if (!this.dropdownTrigger) {
      this.actionClick.emit();
      event.stopPropagation();
    }
  }

  onClick(event: Event) {
    if (this.clickable && !this.dropdownTrigger) {
      this.chipClick.emit();
      event.stopPropagation();
    }
  }

  onParentClick(event: Event) {
    if (this.withAction) return;
    this.onClick(event);
  }
}
