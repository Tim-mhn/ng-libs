import { AbstractControl, Validators } from '@angular/forms';
import { isValidEmail } from '@tim-mhn/common/strings';
import { ALL_VALID_EMAILS_ERROR_KEY } from '../constants/all-valid-emails-error-key.constant';
import { DUPLICATED_EMAILS } from '../constants/duplicated-emails-error.constant';

const allValidEmails = (control: AbstractControl) => {
  const emails = (control.value as string[]) || [];

  const validEmails = emails.every((email) => isValidEmail(email));

  return validEmails ? null : { [ALL_VALID_EMAILS_ERROR_KEY]: true };
};
const duplicatedEmails = (control: AbstractControl) => {
  const emails = (control.value as string[]) || [];
  const someEmailsDuplicated = emails.some((e, i) => emails.indexOf(e) !== i);
  return someEmailsDuplicated ? { [DUPLICATED_EMAILS]: true } : null;
};

export const emailListValidator = (opts: { required: boolean }) => {
  if (opts?.required)
    return [
      Validators.required,
      Validators.minLength(1),
      allValidEmails,
      duplicatedEmails,
    ];

  return [allValidEmails, duplicatedEmails];
};
