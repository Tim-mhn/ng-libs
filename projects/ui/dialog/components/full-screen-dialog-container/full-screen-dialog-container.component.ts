import { Component } from '@angular/core';
import { DialogContainer } from '../../directives/dialog-container.directive';

@Component({
  selector: 'full-screen-dialog-container',
  templateUrl: './full-screen-dialog-container.component.html',
})
export class FullScreenDialogContainerComponent extends DialogContainer {
  constructor() {
    super();
  }

  ngOnInit() {}
}
