import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ButtonsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
