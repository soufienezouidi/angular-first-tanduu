import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule,
    NgxDropzoneModule,
  ],
})
export class CheckoutModule {}
