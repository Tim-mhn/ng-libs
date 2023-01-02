import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUITabComponent } from './components/tab/tab.component';
import { TimUITabGroupComponent } from './components/tab-group/tab-group.component';

@NgModule({
  declarations: [TimUITabComponent, TimUITabGroupComponent],
  imports: [CommonModule],
  exports: [TimUITabComponent, TimUITabGroupComponent],
})
export class TimUITabsModule {}
