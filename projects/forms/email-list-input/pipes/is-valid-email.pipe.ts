import { Pipe, PipeTransform } from '@angular/core';
import { isValidEmail } from '@tim-mhn/common/strings';

@Pipe({
  name: 'isInvalidEmail',
})
export class IsInvalidEmailPipe implements PipeTransform {
  transform(email: string): boolean {
    return !isValidEmail(email);
  }
}
