import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ButtonsModule, SnackbarsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
