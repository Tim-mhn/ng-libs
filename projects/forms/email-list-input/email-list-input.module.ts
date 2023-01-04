import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimUIChipModule } from '@tim-mhn/ng-ui/chip';
import { TimEmailListInputComponent } from './email-list-input/email-list-input.component';
import { IsInvalidEmailPipe } from './pipes/is-valid-email.pipe';
import { IsDuplicatedEmailInListPipe } from './pipes/is-duplicated-email-in-list.pipe';

@NgModule({
  declarations: [
    TimEmailListInputComponent,
    IsInvalidEmailPipe,
    IsDuplicatedEmailInListPipe,
  ],
  imports: [CommonModule, TimUIChipModule],
  exports: [TimEmailListInputComponent],
})
export class TimEmailListInputModule {}
