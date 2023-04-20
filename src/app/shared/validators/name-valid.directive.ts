import { AbstractControl, ValidatorFn } from "@angular/forms";

export function nameValidator(nameRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    
    return nameRegExp.test(control.value) ? { nameInvalid: true } : null;
  }
}