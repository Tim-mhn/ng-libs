import {
  Component,
  EventEmitter,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlValueAccessor } from '@tim-mhn/ng-forms/core';
import { EmitOnUserChange } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'iqair-toggle',
  templateUrl: './toggle.component.html',
})
export class TimUIToggle
  extends BaseControlValueAccessor<boolean>
  implements OnInit, EmitOnUserChange<boolean>
{
  constructor(@Optional() public override ngControl: NgControl) {
    super(ngControl);
  }

  @Output() userChange = new EventEmitter<boolean>();

  ngOnInit() {}

  override value: boolean;
  override isDisabled: boolean;

  toggle(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (this.isDisabled) return;
    const newValue = !this.value;
    super.setValue(newValue);
    this.userChange.emit(newValue);
  }
}
