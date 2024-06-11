import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

export function noWhitespaceValidator(
  control: FormControl
): { [key: string]: any } | null {
  const value = control.value || '';

  // Return null (valid) if the value is null, undefined, or an empty string
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const isWhitespace = value.trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}

export function addressValidator(
  group: FormGroup
): { [key: string]: any } | null {
  const address1 = group.get('address1')?.value;
  const cityId = group.get('cityId')?.value;
  const countryId = group.get('countryId')?.value;
  if (address1 && (!cityId || !countryId)) {
    return { addressError: true };
  }

  return null;
}
