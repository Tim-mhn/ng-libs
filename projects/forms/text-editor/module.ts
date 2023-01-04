import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUIDividerModule } from '@tim-mhn/ng-ui/divider';
import { TimTextEditorComponent } from './components/text-editor/text-editor.component';
import { TimFormsDirectivesModule } from '@tim-mhn/ng-forms/core';

@NgModule({
  declarations: [TimTextEditorComponent],
  imports: [CommonModule, TimUIDividerModule, TimFormsDirectivesModule],
  exports: [TimTextEditorComponent],
})
export class TimTextEditorModule {}
