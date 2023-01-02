import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUISpinnerModule } from '@tim-mhn/ng-ui/spinner';
import { TimUIButton } from './button.component';
import { IconSrcPipe } from './pipes/icon-src.pipe';

@NgModule({
  imports: [CommonModule, TimUISpinnerModule, TimUICoreModule],
  declarations: [TimUIButton, IconSrcPipe],
  exports: [TimUIButton, TimUICoreModule],
})
export class TimUIButtonModule {}
