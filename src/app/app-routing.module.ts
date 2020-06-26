import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home } from 'angular-feather/icons';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
{
  path: 'company',
  loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
},
{
  path: 'products',
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
},
{
  path: 'orders',
  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
}
,
{
  path: 'home',
  component: HomeComponent
},
{ path: '**', component: ErrorPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
