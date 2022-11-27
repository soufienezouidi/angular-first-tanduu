import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { NewInvoiceComponent } from './new-invoice.component';


@NgModule({
  declarations: [NewInvoiceComponent],
  imports: [
    CommonModule,
    NewInvoiceRoutingModule
  ]
})
export class NewInvoiceModule { }
