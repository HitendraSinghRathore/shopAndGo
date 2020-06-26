import { ICompany } from './../data/data-model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies: ICompany[] = [];
  constructor() { }
  loadAllCompanies(): ICompany[] {
   const companyArray = localStorage.getItem('company');
   if (companyArray) {
     this.companies = JSON.parse(companyArray);
   }
   return this.companies;
  }

  saveCompnay(company: ICompany): ICompany[] {
    this.companies.unshift(company);
    localStorage.setItem('company', JSON.stringify(this.companies));
    return this.companies;
  }

  deleteCompany(id: number): ICompany[]{
    this.companies = this.companies.filter((element) => (element.id !== id));
    localStorage.setItem('company', JSON.stringify(this.companies));
    return this.companies;
  }
}
