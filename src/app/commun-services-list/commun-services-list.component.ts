import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-commun-services-list',
  templateUrl: './commun-services-list.component.html',
  styleUrls: ['./commun-services-list.component.css'],
})
export class CommunServicesListComponent implements OnInit {
  company: any;
  customer: any;
  customerconnected: any;
  services: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersser: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('com'));

    this.customerconnected = JSON.parse(localStorage.getItem('main'));
    this.ordersser
      .getcustomerbyuserid(this.customerconnected.id)
      .subscribe((e: any) => {
        this.customer = e;

        this.ordersser
          .getorderbycustomerandjobber(this.customer.id, this.company.id)
          .subscribe((o: any) => {
            this.services = o;
          });
      });
  }
  counter(i: number) {
    return new Array(i);
  }
  gotoauftragdetails(item: any) {
    this.router.navigate(['/commun-services'], {
      queryParams: { ida: item.id },
    });
  }
}
