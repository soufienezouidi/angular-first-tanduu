import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyPtrRecord } from 'dns';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-commun-services',
  templateUrl: './commun-services.component.html',
  styleUrls: ['./commun-services.component.css'],
})
export class CommunServicesComponent implements OnInit {
  compomid: any;
  customer: any;
  company: any;
  auftrag: any;
  services: any[] = [];
  customerconnected: any;
  constructor(
    private route: ActivatedRoute,
    private ordersser: OrdersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      // { order: "popular" }

      this.ordersser.getorderByid(params.ida).subscribe((o: any) => {
        this.auftrag = o[0];
        this.auftrag.location = JSON.parse(this.auftrag.location);

        this.company = this.auftrag.jobberAccepted;

        this.ordersser.getservicesorderid(params.ida).subscribe((sers: any) => {
          this.services = sers;
        });
      });
      // popular
    });
  }
  counter(i: number) {
    return new Array(i);
  }
}
