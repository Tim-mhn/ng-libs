import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUIBaseLink } from './components/base-link/base-link.component';
import { TimUIUnderlineLink } from './components/underline-link/underline-link.component';
import { TimUIDefaultLink } from './components/default-link/default-link.component';
import { TimUIArrowLink } from './components/arrow-link/arrow-link.component';
import { LinkPipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [CommonModule, LinkPipesModule],
  declarations: [
    TimUIBaseLink,
    TimUIUnderlineLink,
    TimUIDefaultLink,
    TimUIArrowLink,
  ],
  exports: [TimUIUnderlineLink, TimUIDefaultLink, TimUIArrowLink],
})
export class TimUILinkModule {}
