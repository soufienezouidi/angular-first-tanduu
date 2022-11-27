import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { CommercialsService } from 'src/app/services/tandu-admin/commercials.service';

import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name;
  splitVal;
  base;
  page;
  commercial: any = {
    languages: {
      name_en: 'Commercial',
      name_fr: 'Commerciale',
      name_de: 'Kommerziell',
    },
  };
  dashboard: any = {
    languages: {
      name_en: 'Dashboard',
      name_fr: 'Tableau de bord ',
      name_de: 'Armaturenbrett',
    },
  };
  myclients: any = {
    languages: {
      name_en: 'My clients',
      name_fr: 'Mes clients',
      name_de: 'meine Kunden',
    },
  };
  logoutT: any = {
    languages: {
      name_en: 'Logout',
      name_fr: 'Se déconnecter',
      name_de: 'Ausloggen',
    },
  };
  constructor(
    private router: Router,

    public commercialserv: CommercialsService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
  }
  infos: any;
  serviceLang: any;
  cuid: any;
  ngOnInit(): void {
    this.cuid = JSON.parse(localStorage.getItem('main')).id;
    this.serviceLang = 'name_' + localStorage.getItem('language');
    this.commercialserv
      .getcommercialbyid(JSON.parse(localStorage.getItem('main')).id)
      .subscribe((e: any) => {
        this.infos = e;
      });
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/']).then((e) => {
      window.location.reload();
    });
  }

  navigate(name) {
    this.name = name;
  }
}