import { AbstractControl } from '@angular/forms';

export const validatePattern = (control: AbstractControl, pattern: RegExp) =>
  pattern.test(control.value) ? null : { pattern: true };
