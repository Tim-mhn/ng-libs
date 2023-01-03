import { NgModule } from '@angular/core';
import { MockAPI } from './infrastructure/mock-api';
import { RequestStateController } from './application/request-state.controller';
@NgModule({
  providers: [RequestStateController, MockAPI],
})
export class TimHttpModule {}
