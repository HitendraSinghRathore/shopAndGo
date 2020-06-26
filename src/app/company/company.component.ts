import { ICompany } from './../data/data-model';
import { CompanyService } from './../core/company.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyList: ICompany[];
  successflag = false;
  constructor(private title: Title,
              private companyService: CompanyService) {

   }

  ngOnInit() {
    this.title.setTitle('Shop&Go - Companies');
    this.companyList = this.companyService.loadAllCompanies();
    this.formInit();
  }
  formInit() {
    this.companyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required)
    });
  }
  addCompany() {
    const company = this.companyForm.getRawValue();
    company.id = Date.now();
    this.companyList = this.companyService.saveCompnay(company);
    this.successflag = true;
    setTimeout(() => {
      this.successflag = false;
    }, 2000 )
    this.companyForm.reset();
  }
  deleteCompany(id: number) {
    this.companyList = this.companyService.deleteCompany(id);
  }

}
