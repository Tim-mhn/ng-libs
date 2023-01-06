import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TimUIButtonModule } from '@tim-mhn/ng-ui/button';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TimUIButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
