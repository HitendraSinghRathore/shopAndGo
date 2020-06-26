import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

export interface ICompany {
  id: number ;
  name: string ;
  gst: string;

}
export interface IProduct{
  name: string;
  cost: number;
  company: number;
}

export interface IOrder{
  orderNumber: string;
  date: number;
  product: string;
  rate: number;
  quantity: number;
}
