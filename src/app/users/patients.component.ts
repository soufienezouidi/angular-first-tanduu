import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

import { CommonServiceService } from './../common-service.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  splitVal;
  base = 'Patients';
  page = 'Dashboard';
  patientSidebar: boolean = false;
  breadcrum = true;
  showSelect = false;
  constructor(
    private router: Router,
    public commonService: CommonServiceService
  ) {
    if (router.url === '/users/chat' || router.url === '/users/checkout') {
      this.breadcrum = false;
    }
    if (
      router.url === '/users/dashboard' ||
      router.url === '/users/pros_related' ||
      router.url === '/users/settings' ||
      router.url === '/users/dependent' ||
      router.url === '/users/accounts' ||
      router.url === '/users/orders' ||
      router.url === '/users/medical-records' ||
      router.url === '/users/medical-details' ||
      router.url === '/users/patients-change-password'
    ) {
      this.patientSidebar = true;
    } else {
      this.patientSidebar = false;
    }
    if (router.url === '/users/chat') {
      this.breadcrum = false;
    } else {
      this.breadcrum = true;
    }

    if (router.url.includes('/users/partner-profile')) {
      this.breadcrum = false;
    } else {
      this.breadcrum = true;
    }
    if (router.url === '/users/search-doctor') {
      this.showSelect = true;
    } else {
      this.showSelect = false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/users/dashboard' ||
          event.url === '/users/favourites' ||
          event.url === '/users/settings' ||
          event.url === '/users/dependent' ||
          event.url === '/users/accounts' ||
          event.url === '/users/orders' ||
          event.url === '/users/medical-records' ||
          event.url === '/users/medical-details' ||
          event.url === '/users/patients-change-password'
        ) {
          this.patientSidebar = true;
        } else {
          this.patientSidebar = false;
        }
      }
      if (event instanceof NavigationStart) {
        if (event.url === '/users/patient-chat') {
          this.breadcrum = false;
        } else {
          this.breadcrum = true;
        }
        if (event.url === '/users/checkout') {
          this.breadcrum = false;
        } else {
          this.breadcrum = true;
        }
      }
      if (event instanceof NavigationStart) {
        if (event.url === '/users/search-doctor') {
          this.showSelect = true;
        } else {
          this.showSelect = false;
        }
      }
      if (router.url === '/users/chat' || router.url === '/users/checkout') {
        this.breadcrum = false;
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        if (this.page === 'patients-change-password') {
          this.page = 'change password';
        }
      }
    });
  }
}
