import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ConfirmPassValidator {
  static Validate(pass: string, confirmPass: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const passVAlue = control.get(pass);
      const confirmPassValue = control.get(confirmPass);

      return passVAlue?.value !== confirmPassValue?.value ? { confirmPass: true } : null;
    };
  }
}

