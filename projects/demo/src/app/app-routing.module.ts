import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { EditableChipsComponent } from './editable-chips-demo/editable-chips-demo.component';
import { EditableChipsModule } from './editable-chips-demo/editable-chips-demo.module';
import { InputsComponent } from './inputs/inputs.component';
import { InputsModule } from './inputs/inputs.module';
import { SnackbarsComponent } from './snackbars/snackbars.component';
import { SnackbarsModule } from './snackbars/snackbars.module';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent,
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
    path: 'dialogs',
    component: DialogsComponent,
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
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
