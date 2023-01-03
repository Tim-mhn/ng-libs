import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimUICalendarNavigationComponent } from '../calendar-navigation/calendar-navigation.component';
import { TimUICalendarTableCellComponent } from '../calendar-table-cell/calendar-table-cell.component';
import { TimUICalendarTableHeaderComponent } from '../calendar-table-header/calendar-table-header.component';
import { TimUICalendarTableComponent } from '../calendar-table/calendar-table.component';
import { TimUICalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    TimUICalendarComponent,
    TimUICalendarTableComponent,
    TimUICalendarTableHeaderComponent,
    TimUICalendarTableCellComponent,
    TimUICalendarNavigationComponent,
  ],
  imports: [CommonModule],
  exports: [TimUICalendarComponent],
})
export class TimUICalendarModule {}
