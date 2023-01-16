import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoDialogComponent, DialogsComponent } from './dialogs.component';
import { TimUIDialogModule } from '@tim-mhn/ng-ui/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [DialogsComponent, DemoDialogComponent],
  imports: [CommonModule, TimUIDialogModule],
})
export class DialogsModule {}
