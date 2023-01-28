import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'demo-selects',
  templateUrl: './selects.component.html',
})
export class SelectsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  FRUITS_OPTIONS = ['banana', 'strawberry', 'pineapple', 'apple'];

  form = this.fb.group({
    select1: '',
    select2: this.fb.control([]),
    select3: this.fb.control({ value: '', disabled: true }),
  });
}
