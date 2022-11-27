import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../common-service.service';
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  appointments;
  patients;
  connecteduser;
  provided: number = 0;
  pending: number = 0;
  penginglist: any[] = [];
  donelist: any[] = [];
  comprelated: number = 0;
  companiesrelated: any[] = [];
  customerorders: any[] = [];
  customer: any;
  constructor(
    public commonService: CommonServiceService,
    private ordersser: OrdersService
  ) {}

  ngOnInit(): void {
    this.connecteduser = JSON.parse(localStorage.getItem('main'));
    this.ordersser
      .getcustomerbyuserid(this.connecteduser.id)
      .subscribe((e: any) => {
        this.customer = e;

        this.ordersser
          .getordersbycustomer(this.customer.id)
          .subscribe((e: any) => {
            this.customerorders = e;

            this.customerorders.forEach((el: any) => {
              if (el.status == 'Neu') {
                this.pending++;
                this.penginglist.push(el);
              }
              if (el.status == 'Payed') {
                this.provided++;
                this.donelist.push(el);

                let exca: boolean = this.companiesrelated.some(
                  (ez) => parseInt(ez.companyId) === parseInt(el.companyId)
                );

                if (this.companiesrelated.indexOf(el.companyId) < 0) {
                  this.companiesrelated.push(parseInt(el.companyId));

                  this.comprelated = this.companiesrelated.length;
                }
              }
            });
          });
      });
  }

  getPatients() {}
}
