import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonServiceService } from '../common-service.service';
import { BlogService } from '../services/blog.service';
import { CategoriesService } from '../services/categories.service';
import { ExpressService } from '../services/tandu-admin/express.service';

@Component({
  selector: 'app-pre-register-partner',
  templateUrl: './pre-register-partner.component.html',
  styleUrls: ['./pre-register-partner.component.css'],
})
export class PreRegisterPartnerComponent implements OnInit {
  viewmore: boolean = false;
  clinicsslides: any[];
  currentLanguage: any;
  serviceLang: string
  clinicsslides2: any[];
  constructor(
    public categservices: CategoriesService,
    public router: Router,
    public commonService: CommonServiceService,
    public blogservice: BlogService,
    public expressserv: ExpressService,
    private deviceService: DeviceDetectorService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
    this.categservices.getallcategories().subscribe((res) => {
      res.forEach((e: any) => {
        e.languages = JSON.parse(e.languages);
      });

      this.clinicsslides = res.slice(0, 12);
      this.clinicsslides2 = res.slice(12, res.length);
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.currentLanguage = localStorage.getItem("language");
    this.serviceLang = "name_" + this.currentLanguage
  }
  showmore() {
    this.viewmore = !this.viewmore;
  }
}
