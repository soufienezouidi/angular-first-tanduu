import { Component, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import { CommonServiceService } from '../../common-service.service';
import { data } from 'jquery';
import { CompanyService } from 'src/app/services/company.service';

declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  clinicsslides: any[] = [];
  serviceLang: string;
  currentLanguage: any;
  pendinglist: any[] = [];
  constructor(
    public categservices: CategoriesServices,
    private modalService: BsModalService,
    public translate: TranslateService,
    private compservice: CompanyService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
  }
  ngOnInit(): void {
    this.categservices.getallsuggestions().subscribe((e) => {
      e.reqs.forEach((element) => {
    
        if (!element.is_deleted && !element.is_accepted) {
          this.compservice
            .getcompanybyid(element.requesterId)
            .subscribe((c) => {
              if (!c.message) {
                c.requestid = element.id;
                this.pendinglist.push(c);
              }
            });
        }
      });
    });
    /*this.categservices.getallpendigrequests().subscribe((e: any) => {
      let tmptable = e.data;
      e.data.forEach((element) => {
       
        this.compservice.getcompanybyid(element.suggestedBy).subscribe((c) => {
          if (!c.message) {
            this.pendinglist.push(c);
            console.log(c);
          }
        });
      });
    });*/
  }
}
