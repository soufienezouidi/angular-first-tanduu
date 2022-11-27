import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/tandu-admin/pages.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css'],
})
export class TermsConditionsComponent implements OnInit {
  pageinfos: any;
  constructor(private pages: PagesService) {}

  ngOnInit() {
    this.pages.getpagebyname('li').subscribe((e: any) => {
      this.pageinfos = e;
    });
    window.scroll(0, 0);
  }
}
