import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIDividerModule } from '@tim-mhn/ng-ui/divider';
import { TimUITextEditorComponent } from './components/text-editor/text-editor.component';
import { TimUIFormsDirectivesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [TimUITextEditorComponent],
  imports: [CommonModule, TimUIDividerModule, TimUIFormsDirectivesModule],
  exports: [TimUITextEditorComponent],
})
export class TimUITextEditorModule {}
