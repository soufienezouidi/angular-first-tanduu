import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { CompaniesService } from 'src/app/admin/services/companies_services/companies.service';
import { AuthenticateService } from 'src/app/services/tandu-admin/authenticate.service';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private statser: AuthenticateService,
    private companyService: CompaniesService
  ) {}
  users: any[] = [];
  customersnew: any[] = [];
  partnersnew: any[] = [];
  customersnewtoday: any[] = [];
  partnerssnewtoday: any[] = [];
  myDate = new Date();
  ngOnInit(): void {
    this.statser.getallusers().subscribe((e: any) => {
      this.customersnew = e;
    });
    this.statser.getallpartners().subscribe((e: any) => {
      console;
      this.partnersnew = e;
      this.partnersnew.forEach((p) => {
        p.proflink = 'https://tanduu.com/' + p.company_link;
        if (!p.country || !p.city) {
          this.companyService
            .getAllLocations({ companyId: p.id })
            .subscribe((data) => {
              let locations: any[] = data.locations;
              if (locations.length > 0) {
                p.city = locations[0].city;
                p.country = locations[0].country;
              }
            });
        }
      });
    });
    let chartAreaData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];
    let chartLineData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];

    /* Morris Area Chart */
    Morris.Area({
      element: 'morrisArea',
      data: [
        { y: '2013', a: 60 },
        { y: '2014', a: 100 },
        { y: '2015', a: 240 },
        { y: '2016', a: 120 },
        { y: '2017', a: 80 },
        { y: '2018', a: 100 },
        { y: '2019', a: 300 },
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Revenue'],
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    /* Morris Line Chart */
    Morris.Line({
      element: 'morrisLine',
      data: [
        { y: '2015', a: 100, b: 30 },
        { y: '2016', a: 20, b: 60 },
        { y: '2017', a: 90, b: 120 },
        { y: '2018', a: 50, b: 80 },
        { y: '2019', a: 120, b: 150 },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Doctors', 'Patients'],
      lineColors: ['#1b5a90', '#ff9d00'],
      lineWidth: 1,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });
  }
}
