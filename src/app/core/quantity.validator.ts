import { AbstractControl, ValidatorFn } from '@angular/forms';

export function quantityValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;
    }
    let string = control.value.toString();
    if (string.indexOf('.') != -1) {
      return {decimalError: true};
    }
    return null;
  }
}
