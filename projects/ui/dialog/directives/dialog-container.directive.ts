import { Directive, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogBgColor } from '../models/dialog-bg-color';

@Directive({
  selector: '[iqairDialogContainer]',
})
export class DialogContainer {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  bgColor: DialogBgColor = 'white';

  constructor() {}

  insertComponent<C>(componentType: Type<C>): void {
    this.container.createComponent(componentType);
  }
}
