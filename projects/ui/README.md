# TimUI

Angular UI library built with Material CDK and Tailwindcss

## Get started

##### Download the package from NPM

`npm install @tim-mhn/ng-ui`

##### Import the stylesheet

In your global `.scss` or `.css` file, add
`@import "@tim-mhn/ng-ui/styles.css"`

##### Import the modules you want to use

Example with `TimUIButtonModule` and `TimUIChipModule`

```
// example.module.ts
import { TimUIButtonModule } from 'tim-ui/button';
  import { TimUIChipModule } from 'tim-ui/chip'

@NgModule({
  imports: [TimUIButtonModule, TimUIChipModule],
  declarations: [ExampleComponent]
})
export class ExampleModule {}

// example.component.html
<button tim-flat-button color="primary" size="md">Click</button>
<tim-chip color="destructive" size="sm">chip</tim-chip>
```

_List of modules_

- `TimUIAlertModule`
- `TimUIAvatarModule`
- `TimUIButtonModule`
- `TimUICardModule`
- `TimUIChipModule`
- `TimUICoreModule`
- `TimUIDialogModule`
- `TimUIDividerModule`
- `TimUIDropdownMenuModule`
- `TimUIFeaturedIconModule`
- `TimUILinkModule`
- `TimUISnackbarModule`
- `TimUISpinnerModule`
- `TimUITabsModule`
- `TimUITooltipModule`

## Build

Run `npm run build:ui` to build the project.

## Build & Publish

- **Bump the version**: `npm version major|minor|patch`
- **Build the library**: `npm run build:ui`
  The build artifacts will be stored in the `dist/` directory.
  This will also run the _tailwind_ command to generate the `.css` file reusing the `tim-tailwind` config.

- **Publish to NPM**: go to the dist folder `cd dist/ui` run `npm publish`

## Running unit tests

Run `ng test ui` to execute the unit tests via [Karma](https://karma-runner.github.io).
