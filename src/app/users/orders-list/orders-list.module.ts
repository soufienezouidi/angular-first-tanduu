import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersListRoutingModule } from './orders-list-routing.module';
import { OrdersListComponent } from './orders-list.component';


@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    OrdersListRoutingModule
  ]
})
export class OrdersListModule { }
