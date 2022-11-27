import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { CompanyService } from 'src/app/services/company.service';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import { BankAccounts } from '../services/bank_accounts/bank-accounts.service';
import { ServicesService } from '../services/categories/services.service';
import { CompaniesService } from '../services/companies_services/companies.service';
import { ShopService } from '../services/shop_galeries/shop.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  userObject: any = JSON.parse(localStorage.getItem('rest'));
  currentLanguage: any = localStorage.getItem('language');
  serviceLang: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private companyService: CompaniesService,
    private modalService: BsModalService,
    private bankAccount: BankAccounts,
    private servicesServices: ServicesService,
    private compser: CompanyService,
    private mapsAPILoader: MapsAPILoader,
    public translate: TranslateService,
    private shopService: ShopService,
    private categoriesService: CategoriesServices,
    private titleService: Title,
    public categservies: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private categser: CategoriesServices
  ) {}
  companyConnected: any;
  userConnected: any;
  addnewproduct: any;
  ngOnInit(): void {
    this.serviceLang = 'name_' + this.currentLanguage;
    this.getCompanyConnected(this.userObject.rest_id);
    this.getUserConnected(this.userObject.rest_id);
  }
  getUserConnected(id: any) {
    var obj = {
      id: id,
    };
    this.companyService.getUserById(obj).subscribe((user) => {
      this.userConnected = user.message;
    });
  }
  getCompanyConnected(id: any) {
    var obj = {
      user_id: id,
    };
    var locationServices = [];
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
    });
  }
  GalleriesList: any[] = [];
  getAllGalleries() {
    var arrGalleries: any[] = [];
    this.shopService
      .getAllGalleries({ userId: this.userObject.rest_id })
      .subscribe((data) => {
        if (data.galleries.length > 0) {
          data.galleries.forEach((element) => {
            if (element.is_deleted == 0) {
              arrGalleries.push({
                id: element.id,
                catalog_name: element.catalog_name,
                catalog_link: element.catalog_link,
                is_deleted: 0,
                galleries: JSON.parse(element.galleries),
              });
            }
          });
          this.GalleriesList = arrGalleries;
          //////// // // ////conslog(this.GalleriesList);
        } else {
          this.GalleriesList = [];
        }
      });
  }
}
