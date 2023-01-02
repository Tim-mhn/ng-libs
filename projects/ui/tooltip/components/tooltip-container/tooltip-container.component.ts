import {
  Component,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TooltipColor } from '../../models/tooltip-color';

@Component({
  selector: 'tim-tooltip-container',
  templateUrl: './tooltip-container.component.html',
})
export class TimUITooltipContainerComponent<T = any, C = any> {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  bgColor: TooltipColor;

  visible = true;
  public insertTemplate(templateRef: TemplateRef<T>): void {
    this.container.createEmbeddedView(templateRef);
  }

  public insertComponent(componentType: Type<C>) {
    return this.container.createComponent(componentType);
  }
}
