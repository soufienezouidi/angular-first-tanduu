import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/tandu-admin/pages.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css'],
})
export class TermsConditionsComponent implements OnInit {
  pageinfos: any;
  constructor(private pages: PagesService) { }
  currentLangue: any;
  termsLang: string;

  ngOnInit() {
    this.currentLangue = localStorage.getItem("language");
    this.termsLang = this.currentLangue
    this.pages.getpagebyname('jt').subscribe((e: any) => {
      this.pageinfos = {
        "en": e.en,
        "fr": e.fr,
        "de": e.de
      };
    });
    window.scroll(0, 0);
  }
}
