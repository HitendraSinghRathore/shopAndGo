import { ICompany } from './../data/data-model';
import { CompanyService } from './../core/company.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {
  constructor(private company: CompanyService){}
  transform(value: any): any {

    let company: ICompany = this.company.loadAllCompanies().find(ele => ele.id == value);
    return company ? company.name: '';
  }

}
