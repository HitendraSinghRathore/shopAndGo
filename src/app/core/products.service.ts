import { IProduct, IOrder } from './../data/data-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList: IProduct[] = [];
  invoice:any;
  orderList: IOrder[] = [];
  constructor() { }

  loadAllProducts() {
    const products = localStorage.getItem('products');
    if (products) {
      this.productsList = JSON.parse(products);
    }
    return this.productsList;
  }
  saveProduct(product: IProduct): IProduct[] {
    this.productsList.unshift(product);
    localStorage.setItem('products', JSON.stringify(this.productsList));
    return this.productsList;
  }
  deleteProduct(productName: string): IProduct[] {
    this.productsList = this.productsList.filter(product => (product.name !== productName));
    localStorage.setItem('products', JSON.stringify(this.productsList));
    return this.productsList;
  }
  updateProduct(product: IProduct): IProduct[]{
    const index = this.productsList.findIndex(ele => ele.name === product.name);
    this.productsList.splice(index, 1, product);
    localStorage.setItem('products', JSON.stringify(this.productsList));
    return [...this.productsList];
  }
  getOrderNumber(orderString: string){
    let orderObject: string = localStorage.getItem('invoice');

    if ( orderObject ) {
      this.invoice = JSON.parse(orderObject);
    } else {
      this.invoice = {
        orderNumber: 0,
        year: (new Date()).getFullYear()
      };
    }
    if (this.invoice.year != (new Date()).getFullYear()) {
          this.invoice = {
            orderNumber: 0,
            year: (new Date()).getFullYear()
          }
        }else {
          this.invoice.orderNumber = parseInt(this.invoice.orderNumber) + 1;
        }
    return `${orderString}/${this.invoice.year}/${this.invoice.orderNumber}`;
  }
  loadAllOrders(){
    const orders = localStorage.getItem('orders');
    if (orders) {
      this.orderList = JSON.parse(orders);
    }
    return this.orderList;
  }
  saveOrder(order: IOrder): IOrder[] {
    this.orderList.unshift(order);
    localStorage.setItem('orders', JSON.stringify(this.orderList));
    localStorage.setItem('invoice', JSON.stringify(this.invoice));
    return [...this.orderList];
  }

}
