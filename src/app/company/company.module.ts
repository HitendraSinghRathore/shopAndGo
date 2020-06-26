import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: CompanyComponent}

];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompanyModule { }
