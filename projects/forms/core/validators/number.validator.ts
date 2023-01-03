import { ValidatorFn, Validators } from '@angular/forms';

const NUMBER_REGEX = /^\d+$/;

export const numberValidator: ValidatorFn = Validators.pattern(NUMBER_REGEX);
