import { IProduct } from './../data/data-model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
export function productNameCheck(products: IProduct[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
return null;
    }
    const product = products.find(element => (element.name.toLowerCase() === control.value.toLowerCase()));
    if (product) {
      return {productExists: true };
    } else {
    return null;
    }
  };
};
