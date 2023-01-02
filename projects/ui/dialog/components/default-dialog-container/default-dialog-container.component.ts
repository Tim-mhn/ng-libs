import { Component } from '@angular/core';
import { DialogContainer } from '../../directives/dialog-container.directive';

@Component({
  selector: 'default-dialog-container',
  templateUrl: './default-dialog-container.html',
  host: { class: 'animate-fadeIn' },
})
export class DefaultDialogContainerComponent extends DialogContainer {
  constructor() {
    super();
  }
}
