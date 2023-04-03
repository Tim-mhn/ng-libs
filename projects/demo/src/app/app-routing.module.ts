import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';
import { ChipsComponent } from './chips/chips.component';
import { ChipsModule } from './chips/chips.module';
import { DatePickersComponent } from './date-pickers/date-pickers.component';
import { DatePickersModule } from './date-pickers/date-pickers.module';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { EditableChipsComponent } from './editable-chips-demo/editable-chips-demo.component';
import { EditableChipsModule } from './editable-chips-demo/editable-chips-demo.module';
import { EditableHeaderInputsDemoComponent } from './editable-header-inputs/editable-header-inputs.component';
import { EditableHeaderInputsDemoModule } from './editable-header-inputs/editable-header-inputs.module';
import { InputsComponent } from './inputs/inputs.component';
import { InputsModule } from './inputs/inputs.module';
import { SelectsComponent } from './selects/selects.component';
import { SelectsModule } from './selects/selects.module';
import { SnackbarsComponent } from './snackbars/snackbars.component';
import { SnackbarsModule } from './snackbars/snackbars.module';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TooltipsModule } from './tooltips/tooltips.module';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent,
  },
  {
    path: 'chips',
    component: ChipsComponent,
  },
  {
    path: 'date-pickers',
    component: DatePickersComponent,
  },
  {
    path: 'snackbars',
    component: SnackbarsComponent,
  },
  {
    path: 'inputs',
    component: InputsComponent,
  },
  {
    path: 'editable-chips',
    component: EditableChipsComponent,
  },
  {
    path: 'editable-header-inputs',
    component: EditableHeaderInputsDemoComponent,
  },
  {
    path: 'dialogs',
    component: DialogsComponent,
  },
  {
    path: 'tooltips',
    component: TooltipsComponent,
  },
  {
    path: 'selects',
    component: SelectsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ButtonsModule,
    SnackbarsModule,
    InputsModule,
    EditableChipsModule,
    DialogsModule,
    TooltipsModule,
    SelectsModule,
    ChipsModule,
    DatePickersModule,
    EditableHeaderInputsDemoModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
