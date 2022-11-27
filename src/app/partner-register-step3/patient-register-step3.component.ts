import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { CategoriesService } from 'src/app/services/categories.service';
import { TranslateService } from '@ngx-translate/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-patient-register-step3',
  templateUrl: './patient-register-step3.component.html',
  styleUrls: ['./patient-register-step3.component.css'],
})
export class PatientRegisterStep3Component implements OnInit {
  serviceLang: any;
  Allserviceslist: any[] = [];
  nextArray: any[] = [];
  newArr: any[] = [];
  splitArray: any[] = [];
  result_search: any;
  Allinformationsneeded: any[] = [];
  Finaleselectedservice: any;
  showSuggestion: boolean = false;
  searchSeletedService: any;
  currentLanguage: any;
  allcategs: any[] = [2, 3, 4, 5, 6, 8];
  constructor(public router: Router, public categservices: CategoriesService) {}
  gotosteptwo() {
    this.router.navigateByUrl('/step-two');
  }
  gotostepone() {
    this.router.navigateByUrl('/step-one');
  }

  ngOnInit(): void {
    this.allcategs = [2, 3, 4, 5, 6, 8];
  }
}
