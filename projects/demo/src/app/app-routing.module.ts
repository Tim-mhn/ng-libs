import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ButtonsModule,
    SnackbarsModule,
    InputsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
