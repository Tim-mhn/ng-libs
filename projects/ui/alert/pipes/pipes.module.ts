import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertBgClassPipe } from './bg-class.pipe';
import { AlertIconPipe } from './icon.pipe';

@NgModule({
  declarations: [AlertBgClassPipe, AlertIconPipe],
  imports: [CommonModule],
  exports: [AlertBgClassPipe, AlertIconPipe],
})
export class AlertPipesModule {}
