import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CompanyNamePipe } from './company-name.pipe';


@NgModule({
  declarations: [CompanyNamePipe],
  imports: [

    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    CompanyNamePipe

  ]
})
export class SharedModule { }
