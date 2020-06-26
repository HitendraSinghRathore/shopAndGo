import { CompanyService } from './../core/company.service';
import { ICompany, IProduct, IOrder } from './../data/data-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './../core/products.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { quantityValidator } from '../core/quantity.validator';

declare const $: any;
const kendo: any = window['kendo'];
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orderNumber: string;
orderForm: FormGroup;
companyList: ICompany[] = [];
productList: IProduct[] = [];
filteredProducts: IProduct[] = [];
orderList: IOrder[] = [];
orderObject: any = {};
totalAmount: number = 0;
  constructor(private title: Title,
              private product: ProductsService,
              private company: CompanyService,
              private currencyPipe: CurrencyPipe) { }
  loadData() {
    this.companyList = this.company.loadAllCompanies();
    this.productList = this.product.loadAllProducts();
    this.orderList = this.product.loadAllOrders();
  }

  ngOnInit() {
    this.title.setTitle('Shop&Go - Orders');
    this.loadData();
    this.orderNumber = this.product.getOrderNumber('PO');
    this.orderFormInit();
    this.onChanges();
  }
  onChanges() {
    this.orderForm.get('company').valueChanges.subscribe(company => {
      this.companyUpdated(company);
    });
    this.orderForm.get('product').valueChanges.subscribe(product => {
      this.productUpdated(product);
    });
    this.orderForm.get('quantity').valueChanges.subscribe(quantity => {
      this.quantityUpdated(quantity);
    })
  }

  companyUpdated(companyId: number ) {
    this.filteredProducts = this.productList.filter(ele => (ele.company == companyId));
    this.orderForm.patchValue({
      product: '',
      rate: 0,
      quantity: 1
    });
    this.totalAmount = 0;

  }
  productUpdated(productName: string) {
    if (productName) {
      let object: IProduct = this.productList.find(ele => (ele.name === productName));
      this.orderForm.patchValue({
        rate: object.cost,
      });
      this.totalAmount = object.cost;
    }
  }
  quantityUpdated(quantity: number) {
    let formObj = this.orderForm.getRawValue();
    if(formObj.rate && quantity > 0 ) {
      this.totalAmount = formObj.rate * quantity;
    } else {
      this.totalAmount = 0;
    }
  }
  orderFormInit() {
    this.orderForm = new FormGroup({
      company: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      rate: new FormControl({value: 0, disabled: true}, Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1), quantityValidator()]),
    });
  }

  placeOrder(){
    const formObject = this.orderForm.getRawValue();
    const order: IOrder = {
      date: Date.now(),
      orderNumber: this.orderNumber,
      product: formObject.product,
      quantity: formObject.quantity,
      rate: formObject.rate

    };
    this.orderForm.reset();
    this.openInvoice(order);
    this.orderList = this.product.saveOrder(order);

  }

  openInvoice(order) {
    const product = this.productList.find(product => product.name === order.product);
    const compnay = this.companyList.find(company => company.id == product.company);
    this.orderObject = {
      orderDate: new Date(order.date).toDateString(),
      orderNumber: order.orderNumber,
      orderQuantity: order.quantity,
      orderProductName: product.name,
      orderProductCost: this.currencyPipe.transform(product.cost,'INR'),
      orderTotal: this.currencyPipe.transform((parseInt(order.quantity) * product.cost), 'INR'),
      orderCompanyName: compnay.name,
      orderCompanyGST: compnay.gst

    };
    $('#invoice').modal('show');
  }
  export() {
    let order = this.orderObject.orderNumber;
    kendo.drawing.drawDOM('#printPDF',  {
      paperSize: "A4",
      margin: { top: "1cm", bottom: "1cm" ,left: "2cm", right: "2cm"},
      scale: 1.0,
      height: 500
  }).then(function(group) {
    kendo.drawing.pdf.saveAs(group, `${order}.pdf`);
  })
  }
}
