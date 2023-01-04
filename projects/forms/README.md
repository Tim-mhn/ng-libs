# TimForms

Angular UI library for forms components built with Material CDK, Tailwindcss and Reactive Forms

### only works with Angular Reactive Forms

## Get started

##### Download the package from NPM

`npm install @tim-mhn/ng-forms`

##### Import the stylesheet

In your global `.scss` or `.css` file, add
`@import "@tim-mhn/ng-forms/styles.css"`

##### Import the modules you want to use

Example with `TimInputModule`

```
// example.module.ts
import { TimInputModule } from '@tim-mhn/ng-forms/input';

@NgModule({
  imports: [TimInputModule],
  declarations: [ExampleComponent]
})
export class ExampleModule {}

// example.component.html
<tim-input [formControl]="fc"></tim-input>

// example.component.ts
@Component({})
export class ExampleComponent {

  constructor(private fb: FormBuilder) {}

  fc = this.fb.control('')
}
```

_List of modules_

- `TimButtonToggleModule`
- `TimCheckboxModule`
- `TimDateRangePickerModule`
- `TimDaysPickerModule`
- `TimEditableHeaderInputModule`
- `TimEmailListInputModule`
- `TimImageUploadModule`
- `TimInputModule`
- `TimInputFieldModule`
- `TimPasswordInputModule`
- `TimRadioModule`
- `TimSelectModule`
- `TimSliderModule`
- `TimTextEditorModule`
- `TimTimeInputModule`
- `TimToggleModule`

## Build

Run `npm run build:forms` to build the project.

## Build & Publish

- **Bump the version**: `npm version major|minor|patch`
- **Build the library**: `npm run build:forms`
  The build artifacts will be stored in the `dist/` directory.
  This will also run the _tailwind_ command to generate the `.css` file reusing the `iqair-tailwind` config.

- **Publish to NPM**: go to the dist folder `cd dist/forms` run `npm publish`

## Running unit tests

Run `ng test forms` to execute the unit tests via [Karma](https://karma-runner.github.io).
