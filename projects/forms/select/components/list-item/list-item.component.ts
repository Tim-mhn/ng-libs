import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { TimUIPrefix } from '@tim-mhn/ng-ui/core';
import { ListItemCheckboxPosition } from '../../models/checkbox-position';
@Component({
  selector: 'select-list-item',
  templateUrl: './list-item.component.html',
  host: {
    '[class.pointer-events-none]': 'disabled',
  },
})
export class SelectListItemComponent implements OnInit {
  public readonly CHECK_IMG_PATH = ICONS.CHECK_BLUE;

  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Input() withCheckbox: boolean;
  @Input() useDefaultHeight = false;
  @Input() checkboxPosition: ListItemCheckboxPosition = 'start';

  @ContentChild(TimUIPrefix) prefix: TimUIPrefix;

  constructor() {}

  ngOnInit() {}
}
