import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { EmitOnUserChange } from '@tim-mhn/ng-forms/core';

@Component({
  selector: 'iqair-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent
  implements
    OnInit,
    OnChanges,
    AfterViewInit,
    ControlValueAccessor,
    EmitOnUserChange<number>
{
  @ViewChild('progress') progress: ElementRef;

  value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;

  // emits when value user moves the slider
  // but still hasn't released it to update the control value
  @Output() progressChange = new EventEmitter<number>();
  @Output() userChange = new EventEmitter<number>();

  private onTouched = () => {};
  // eslint-disable-next-line no-unused-vars
  private onChange = (value: number) => {};

  touched = false;
  disabled = false;

  constructor(@Optional() public ngControl: NgControl) {
    // eslint-disable-next-line no-param-reassign
    if (ngControl) ngControl.valueAccessor = this;
  }

  writeValue(value: number): void {
    const adjustedValue = this._getAdjustedValueByStep(value);
    this.value = adjustedValue;
    if (this.progress) {
      this._updateProgress(adjustedValue);
    }
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  ngOnChanges(): void {
    this._handleOnInputsChanged();
  }

  // only update the control's value when user releases the slider
  onInputChange() {
    if (!this.disabled) {
      this.onChange(this.value);
      this.userChange.emit(this.value);
    }
  }

  updateProgressBar(event: Event) {
    const value = Number.parseFloat(
      <any>(<HTMLInputElement>event.target).value
    );
    if (!this.disabled) {
      this.value = value;
      this._updateProgress(value);
    }
  }

  ngAfterViewInit(): void {
    this._updateProgress(this.value);
  }

  onInputTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  private _handleOnInputsChanged() {
    const adjustedValue = this._getAdjustedValueByStep(this.value);
    this.value = adjustedValue;
    if (this.progress) {
      this._updateProgress(adjustedValue);
    }
  }
  private _updateProgress(value: number) {
    const progressBar: HTMLDivElement = this.progress.nativeElement;
    // if value is inferior to min accepted value, set progress bar width to 0%
    const percentage =
      value >= this.min
        ? ((value - this.min) / (this.max - this.min)) * 100
        : 0;

    progressBar.style.width = `${percentage}%`;
    this.progressChange.emit(this.value);
  }

  private _getAdjustedValueByStep(value: number) {
    return Math.floor(value / this.step) * this.step;
  }
}
