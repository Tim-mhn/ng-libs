import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkColorPipe } from './link-color.pipe';
import { LinkArrowPipe } from './link-arrow.pipe';

@NgModule({
  declarations: [LinkColorPipe, LinkArrowPipe],
  imports: [CommonModule],
  exports: [LinkColorPipe, LinkArrowPipe],
})
export class LinkPipesModule {}
