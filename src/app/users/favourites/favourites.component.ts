import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: any = [];
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
    private ordersser: OrdersService,
    private router: Router
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
                this.favourites.push(el.jobberAccepted);
                this.favourites.forEach((element) => {
                  element.services = this.ordersser
                    .getorderbycustomerandjobber(this.customer.id, element.id)
                    .subscribe((o: any) => {
                      let arr: any[] = [];
                      arr = o;
                      element.servicesprov = arr.length;
                    });
                });
              }
            });
          });
      });
  }

  gotocommun(com) {
    com.hashtags = JSON.parse(com.hashtags);
    localStorage.setItem('com', JSON.stringify(com));
    this.router.navigateByUrl('/commun-services-list');
  }
}
