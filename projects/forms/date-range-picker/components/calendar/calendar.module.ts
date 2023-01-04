import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimCalendarNavigationComponent } from '../calendar-navigation/calendar-navigation.component';
import { TimCalendarTableCellComponent } from '../calendar-table-cell/calendar-table-cell.component';
import { TimCalendarTableHeaderComponent } from '../calendar-table-header/calendar-table-header.component';
import { TimCalendarTableComponent } from '../calendar-table/calendar-table.component';
import { TimCalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    TimCalendarComponent,
    TimCalendarTableComponent,
    TimCalendarTableHeaderComponent,
    TimCalendarTableCellComponent,
    TimCalendarNavigationComponent,
  ],
  imports: [CommonModule],
  exports: [TimCalendarComponent],
})
export class TimCalendarModule {}
