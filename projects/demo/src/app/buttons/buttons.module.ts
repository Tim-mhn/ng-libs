import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons.component';
import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
@NgModule({
  declarations: [ButtonsComponent],
  imports: [CommonModule, TimUIButtonModule, TimUICoreModule],
})
export class ButtonsModule {}
