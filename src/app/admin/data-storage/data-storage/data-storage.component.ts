import { Component, OnInit } from '@angular/core';
import { InformationsService } from '../../services/orders/informations/informations.service';
import { CompaniesService } from '../../services/companies_services/companies.service';

@Component({
  selector: 'app-data-storage',
  templateUrl: './data-storage.component.html',
  styleUrls: ['./data-storage.component.css'],
})
export class DataStorageComponent implements OnInit {
  constructor(
    public companiesService: CompaniesService,
    public informationServices: InformationsService,
    public sourceServices: CompaniesService
  ) {}
  userData = JSON.parse(localStorage.getItem('main'));
  companyConnected: any;

  ngOnInit(): void {
    this.getCompanyConnected(this.userData.id);
  }

  getCompanyConnected(user_connected: any) {
    return this.companiesService
      .getCompanyUser(user_connected)
      .subscribe((data) => {
        return (this.companyConnected = data);
      });
  }
}
