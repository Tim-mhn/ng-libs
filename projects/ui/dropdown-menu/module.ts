import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimUICoreModule } from '@tim-mhn/ng-ui/core';
import { TimUIDropdownMenu } from './components/dropdown-menu/dropdown-menu.component';
import { TimUIDropdownTrigger } from './directives/dropdown-trigger.directive';
import { TimUIDropdownItem } from './components/dropdown-item/dropdown-item.component';
import { TimUIDropdownHeader } from './components/dropdown-header/dropdown-header.component';

@NgModule({
  declarations: [
    TimUIDropdownMenu,
    TimUIDropdownTrigger,
    TimUIDropdownItem,
    TimUIDropdownHeader,
  ],
  imports: [CommonModule, OverlayModule, TimUICoreModule],
  exports: [
    TimUIDropdownMenu,
    TimUIDropdownTrigger,
    TimUIDropdownItem,
    TimUICoreModule,
    TimUIDropdownHeader,
  ],
})
export class TimUIDropdownMenuModule {}
