import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
} from '@angular/core';
import Swal from 'sweetalert2';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonServiceService } from '../common-service.service';
import { UserService } from '../services/user.service';
import { ServicesService } from './services/categories/services.service';
import { CompaniesService } from './services/companies_services/companies.service';
import { CategoriesService } from '../services/categories.service';
import { AlertPromise } from 'selenium-webdriver';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  adminShow: boolean = true;
  content?: string;
  services: any;
  userConnected: any;
  list_words: any = [];
  url: any;
  invitationKey: any;
  status: any;
  completed: boolean = false;
  companyConnected: any;
  constructor(
    @Inject(DOCUMENT) private document,
    public commonService: CommonServiceService,
    public servicesService: ServicesService,
    private route: ActivatedRoute,
    public Router: Router,
    private userService: UserService,
    private companyService: CompaniesService,
    public categservices: CategoriesService
  ) { }
  serviceLang: any;
  currentLanguage: any;
  Allserviceslist: any[] = [];
  messages: any = {
    name_en:
      'Before we can show your profile on search results , please specify your branch and the type of services you provide',
    name_fr:
      'Avant que nous puissions afficher votre profil dans les résultats de recherche, veuillez spécifier votre catégorie et le type de services que vous fournissez',
    name_de:
      'Bevor wir Ihr Profil in den Suchergebnissen anzeigen können, geben Sie bitte Ihre Branche und die Art der von Ihnen angebotenen Dienstleistungen an',
  }
  login: any = {
    name_en: "Continue",
    name_fr: "Continuez",
    name_de: "Fortsetzen",
  }
  ngOnInit(): void {
    $(document).ready(() => {
      $('body').on('click', function () {
        //$('.main-wrapper').removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        $('html').removeClass('menu-opened');
      });
    });
    $(document).click((event) => {
      if (!$(event.target).closest('#sidebar').length) {
        // the click occured outside '#element'
        $('.main-wrapper').removeClass('slide-nav');
      }        
    });
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    /* get the parameters for invitations */
    this.route.queryParams.subscribe((params) => {
      this.invitationKey = params['invitation_key'];
      this.status = params['status'];
    });
    this.commonService.nextmessage('admin');
    let scope = this;
    this.userConnected = JSON.parse(localStorage.getItem('main'));
    if (this.userConnected == null) {
      localStorage.setItem('redirect', window.location.href);
      window.location.href = 'http://localhost:4200/login-page';
      this.adminShow = false;
    } else {
      var obj = {
        user_id: this.userConnected.id,
      };
      this.companyService.getCompanyUser(obj).subscribe((company) => {
        this.companyConnected = company;
       
        this.companyService
          .getAllLocations({ companyId: this.companyConnected.id })
          .subscribe((data) => {
            let locations: any[] = data.locations;
          });
      });
    }
  }
}
