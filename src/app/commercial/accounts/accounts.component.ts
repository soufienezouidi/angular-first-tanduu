import { Component, OnInit } from '@angular/core';
import { CommercialsService } from '../../services/tandu-admin/commercials.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor(private commercialserv: CommercialsService) {}
  clients: any = [];
  infos: any;
  income: any;
  incometoday: any;
  ngOnInit(): void {
    this.commercialserv
      .getcommercialbyid(JSON.parse(localStorage.getItem('main')).id)
      .subscribe((e: any) => {
        this.infos = e;

        this.getincome();
        this.getclients();
      });
    this.getincome();
    this.getclients();
  }
  getclients() {
    this.commercialserv
      .getcommercialbucommid(this.infos.id)
      .subscribe((datacom: any) => {
        this.clients = datacom;
        this.clients.forEach((element) => {
          element.client = JSON.parse(element.client);
        });
      });
  }
  getincome() {
    this.commercialserv
      .getcommercialincomebyid(this.infos.id)
      .subscribe((data: any) => {
        this.income = data.res[0]['SUM(income)'];
      });
    this.commercialserv
      .getcommercialincometodaybyid(this.infos.id)
      .subscribe((data: any) => {
        this.incometoday = data.res;
      });
  }
}
