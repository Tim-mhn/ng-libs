import { NgModule } from '@angular/core';
import { DragCursor } from './directives/drag-cursor.directive';
import { TimUIPrefix } from './directives/prefix.directive';
import { TimUISuffix } from './directives/suffix.directive';
import { ComponentDismisser } from './services/component-dismisser.service';

@NgModule({
  declarations: [TimUIPrefix, TimUISuffix, DragCursor],
  imports: [],
  providers: [ComponentDismisser],
  exports: [TimUIPrefix, TimUISuffix, DragCursor],
})
export class TimUICoreModule {}
