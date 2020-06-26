import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,

  }
]
@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsModule { }
