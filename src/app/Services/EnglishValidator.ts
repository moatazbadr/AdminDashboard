import { AbstractControl, ValidationErrors } from '@angular/forms';

export function englishOnlyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const englishRegex = /^[\u0000-\u007F]*$/; 
  return value && !englishRegex.test(value)
    ? { englishOnly: 'Only English characters are allowed.' }
    : null;
}
