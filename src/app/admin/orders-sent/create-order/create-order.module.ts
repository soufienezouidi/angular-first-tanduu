import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderComponent } from './create-order.component';
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    NgbButtonsModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatListModule,
    FormsModule

  ]
})
export class CreateOrderModule { }
