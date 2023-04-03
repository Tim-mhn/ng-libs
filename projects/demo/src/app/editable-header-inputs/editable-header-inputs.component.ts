import { Component, OnInit } from '@angular/core';
import { TypedFormBuilder } from '@tim-mhn/common/typed-forms';

@Component({
  selector: 'demo-editable-header-inputs',
  templateUrl: './editable-header-inputs.component.html',
})
export class EditableHeaderInputsDemoComponent implements OnInit {
  constructor(private tfb: TypedFormBuilder) {}

  ngOnInit(): void {}

  form = this.tfb.group({
    one: '',
    two: '<strong class="text-blue-500">hello</strong>',
  });
}
