import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-editable-chips',
  templateUrl: './editable-chips-demo.component.html',
})
export class EditableChipsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  form = this.fb.group({
    chip1: this.fb.control(2),
    chip2: this.fb.control(42),
    chip3: this.fb.control(23, Validators.min(3)),
    disabledChip: this.fb.control({ value: 3, disabled: true }),
  });
}
