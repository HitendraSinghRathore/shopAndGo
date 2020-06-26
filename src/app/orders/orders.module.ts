import { CommonModule, CurrencyPipe} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
]

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ CurrencyPipe],
  exports: [RouterModule]
})
export class OrdersModule { }
