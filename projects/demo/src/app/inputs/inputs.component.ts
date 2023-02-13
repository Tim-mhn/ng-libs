import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICONS } from '@tim-mhn/common/icons';
import { TagTemplateBuilder } from '@tim-mhn/ng-forms/autocomplete';
@Component({
  selector: 'demo-inputs',
  templateUrl: './inputs.component.html',
})
export class InputsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  readonly QUESTION_CIRCLE_ICON = ICONS.QUESTION_MARK_CIRCLE_GRAY_500;
  form = this.fb.group({
    name: '',
    name2: ['', [Validators.required, Validators.minLength(10)]],
    name3: { value: '', disabled: true },
    name4: { value: '', disabled: true },
    name5: ['', [Validators.required, Validators.minLength(10)]],
    name6: ['', [Validators.required, Validators.minLength(10)]],
    name7: ['', [Validators.required, Validators.minLength(10)]],
    username1: { value: '', disabled: true },
    username2: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(10)],
    ],
    username3: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(10)],
    ],
    username4: { value: '', disabled: false },
    password1: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(15)],
    ],
    password2: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(15)],
    ],
    password3: { value: '', disabled: true },
    smallInput: '',
    inputSuggester: '',
    htmlInput: "<span style='color:blue'>HTML</span> input",
  });

  onFocus = (e: Event) => {
    // console.group('onFocus');
    // console.groupEnd();
  };

  onBlur = (e: Event) => {
    setTimeout(() => {
      console.group('onBlur');
      console.groupEnd();
    }, 10);
  };

  onOptionClicked() {
    console.group('option clicked');
    console.groupEnd();
  }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(console.log);
  }

  // onkeydown = console.log;

  tagTemplate: TagTemplateBuilder = (text: string) =>
    `<span contentEditable="false" class="text-gray-800 border border-gray-200 rounded-md shadow-lg bg-gray-100">${text}</span> `;

  autocompleteSuggestions = ['hello', 'world', 'tim', 'tom'];
}
