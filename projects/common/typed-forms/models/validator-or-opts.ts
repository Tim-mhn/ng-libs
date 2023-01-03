import { AbstractControlOptions, ValidatorFn } from '@angular/forms';

export type ValidatorOrOpts =
  | ValidatorFn
  | ValidatorFn[]
  | AbstractControlOptions
  | null;
