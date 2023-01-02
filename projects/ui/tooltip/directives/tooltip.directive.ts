import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TooltipColor } from '../models/tooltip-color';

@Component({
  selector: 'tim-tooltip',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
})
export class TimUITooltip {
  constructor(public vcr: ViewContainerRef) {}

  @ViewChild(TemplateRef) private _templateRef: TemplateRef<any>;

  @Input() color: TooltipColor = 'neutral';

  public get templateRef() {
    return this._templateRef;
  }
}
