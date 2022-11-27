import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersSentRoutingModule } from './orders-sent-routing.module';
import { OrdersSentComponent } from './orders-sent.component';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';






@NgModule({
  declarations: [OrdersSentComponent],
  imports: [
    CommonModule,
    OrdersSentRoutingModule,
    MatCardModule,
    DataTablesModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class OrdersSentModule { }
