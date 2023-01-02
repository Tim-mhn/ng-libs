import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tim-alert-action',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class TimUIAlertAction {
  /**
   * @property this is to allow the parent TimUIAlert to access the template inside a IQairAlertAction
   * and be able to render them with a bullet point between them
   */
  @ViewChild(TemplateRef) template: TemplateRef<any>;
}
