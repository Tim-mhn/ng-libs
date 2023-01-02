import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  OnInit,
} from '@angular/core';
import { TimUIPrefix, TimUISuffix } from '@tim-mhn/ng-ui/core';

@Component({
  selector: 'tim-dropdown-item, [tim-dropdown-item]',
  templateUrl: './dropdown-item.component.html',
})
export class TimUIDropdownItem implements OnInit, AfterContentInit {
  constructor() {}

  @ContentChild(TimUIPrefix) prefix: TimUIPrefix;
  @ContentChild(TimUISuffix) suffix: TimUISuffix;

  @Input() disabled = false;

  public hasPrefix: boolean;
  public hasSuffix: boolean;

  ngOnInit(): void {}

  _onClick(e: Event) {
    // stop event propagation if disabled to prevent menu from closing
    if (this.disabled) e.stopPropagation();
  }

  ngAfterContentInit() {
    this.hasPrefix = !!this.prefix;
    this.hasSuffix = !!this.suffix;
  }
}
