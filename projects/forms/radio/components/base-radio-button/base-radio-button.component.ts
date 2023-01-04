import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tim-base-radio-button',
  templateUrl: './base-radio-button.component.html',
})
export class TimBaseRadioButtonComponent implements OnInit {
  @Input() checked: boolean;
  @Input() disabled: boolean;

  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {}

  hovered: boolean;
  focused: boolean;
  toggleChecked(e: Event) {
    e.stopPropagation();
    // radio buttons cannot be unchecked
    if (this.checked) return;
    this.checked = true;
    this.checkedChange.emit(this.checked);
  }
  setHovered(isHovered: boolean) {
    this.hovered = isHovered;
  }

  setFocused(isFocused: boolean) {
    this.focused = isFocused;
  }

  ngOnInit() {}
}
