import { Component, Input } from '@angular/core';
import { ThemeSize } from '@tim-mhn/ng-ui/core';
import { SpinnerColor } from './models/spinner-color';

@Component({
  selector: 'tim-spinner',
  templateUrl: './spinner.component.html',
  host: {
    '[style.display]': '"flex"',
  },
})
export class TimUISpinner {
  constructor() {}

  @Input() size: ThemeSize = 'sm';
  @Input() color: SpinnerColor = 'neutral';
  @Input() withText = false;
}
