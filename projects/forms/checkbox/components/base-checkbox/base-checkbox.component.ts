import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICONS } from '@tim-mhn/common/icons';
import { CheckboxIcon, CheckboxSize } from '../../models';

@Component({
  selector: 'tim-base-checkbox',
  templateUrl: './base-checkbox.component.html',
})
export class TimBaseCheckbox implements OnChanges {
  constructor() {}

  public readonly CHECK_IMG_PATH = ICONS.CHECK_BLUE as string;
  public readonly CHECK_GRAY_IMG_PATH = 'assets/icons/check-outline.svg';
  public readonly MINUS_IMG = 'assets/icons/minus-sm-outline-blue-500.svg';
  public readonly MINUS_GRAY_IMG = ICONS.MINUS_GRAY;
  public iconSrc = this.CHECK_IMG_PATH;

  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Input() hasFocus: boolean;
  @Input() hasError: boolean;
  @Input() size: CheckboxSize = 'xs';
  @Input() hovered: boolean;
  @Input() icon: CheckboxIcon = 'check';

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled || changes.icon) this._updateIcon();
  }
  onBlur(event: Event) {
    event.stopPropagation();
    this.blur.emit();
  }

  onFocus(event: Event) {
    event.stopPropagation();
    this.focus.emit();
  }

  private _updateIcon() {
    if (this.icon === 'minus') {
      this.iconSrc = this.disabled ? this.MINUS_GRAY_IMG : this.MINUS_IMG;
    } else {
      this.iconSrc = this.disabled
        ? this.CHECK_GRAY_IMG_PATH
        : this.CHECK_IMG_PATH;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
