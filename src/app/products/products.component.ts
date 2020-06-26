import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProduct, ICompany } from './../data/data-model';
import { ProductsService } from './../core/products.service';
import { CompanyService } from './../core/company.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { productNameCheck } from '../core/product.validator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: IProduct[] = [];
  productForm: FormGroup;
  editMode: boolean = false;
  editForm: FormGroup;
  productEdit: IProduct;
  companyList: ICompany[] = [];
  successflag: boolean = false;
  constructor(private title: Title,
              private company: CompanyService,
              private products: ProductsService) { }


ngOnInit() {
    this.title.setTitle('Shop&Go - Products');
    this.productList = this.products.loadAllProducts();
    this.companyList = this.company.loadAllCompanies();
    this.formInit();
  }
  addNewProduct(){
    this.editForm.reset();
    this.editMode = false;
    this.productEdit = null;
  }
  formInit() {
    this.productForm = new FormGroup({
      name: new FormControl('',[Validators.required, productNameCheck(this.productList)]),
      cost: new FormControl('', [Validators.required, Validators.min(0)]),
      company: new FormControl('', [Validators.required])
    });
  }
  saveProduct(){
    this.productList = this.products.saveProduct(this.productForm.value);
    this.successflag = true;
    setTimeout(() => {
      this.successflag = false;
    }, 2000 )
    this.productForm.reset();
  }
  deleteProduct(name: string) {
    this.productList = this.products.deleteProduct(name);
    this.formInit();
    this.editMode = false;
  }
  editProduct(name: string){
    this.productEdit = this.productList.find(ele => ele.name === name);
    this.editMode = true;
    this.editFormInit(this.productEdit);
  }
  editFormInit(product: IProduct) {
    this.editForm = new FormGroup({
      name: new FormControl({value: product.name, disabled: true}, [Validators.required]),
      cost: new FormControl(product.cost, [Validators.required, Validators.min(0)]),
      company: new FormControl(product.company, Validators.required)
    });
  }
  updateProduct(){
    let product = this.editForm.getRawValue();
    this.productList = this.products.updateProduct(product);
    this.editMode = false;
    this.productEdit = null;
  }

}
