import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderDescriptionDirective } from './directives/card-header-description.directive';
import { CardHeaderRightActionDirective } from './directives/card-header-right-action.directive';
import { CardHeaderTitleDirective } from './directives/card-header-title.directive';
import { CardContentDirective } from './directives/card-content.directive';
import { CardHeaderComponent } from './components/card-header/card-header.component';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderDescriptionDirective,
    CardHeaderRightActionDirective,
    CardHeaderTitleDirective,
    CardContentDirective,
  ],
  imports: [CommonModule],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderDescriptionDirective,
    CardHeaderRightActionDirective,
    CardHeaderTitleDirective,
    CardContentDirective,
  ],
})
export class TimUICardModule {}
