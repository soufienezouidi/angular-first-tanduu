import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CompaniesService } from '../services/companies_services/companies.service';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  public langCollapsed = true;
  showBack: Boolean = false;
  session: any;
  privileges: any;
  test: any[] = [];
  session_state = '0';
  userConnected: any;
  username: string = '';
  successExpired: any;
  listLang = [
    {
      name: 'English',
      flag: '../../../assets/img/flags/en.png',
    },
    {
      name: 'Frensh',
      flag: '../../../assets/img/flags/fr.png',
    },
    {
      name: 'Deutsch',
      flag: '../../../assets/img/flags/de.png',
    },
  ];

  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    public translate: TranslateService,
    public authService: AuthenticationService,
    public companiesService: CompaniesService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
  }
  checkIfAuth(module: any) {
    return this.privileges[module];
  }
  changeLanguage(lang: any) {
    localStorage.setItem('language', lang);
    /*$('#loading').css('display', 'block');
    $('.ng-select').css('display', 'none');*/
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  coming: any;
  currentLanguage: any;
  languagesList: any[] = [
    {
      languages: {
        name_en: 'English (US)',
        name_fr: 'Anglais (États-Unis)',
        name_de: 'Amerikanisches Englisch',
      },
      symbol: 'en',
    },

    {
      languages: {
        name_en: 'French',
        name_fr: 'Français',
        name_de: 'Französisch',
      },

      symbol: 'fr',
    },
    {
      languages: {
        name_en: 'Deutsch',
        name_fr: 'Deutsch',
        name_de: 'Deutsch',
      },
      symbol: 'de',
    },
  ];

  comingSoon() {
    this.coming = {
      name_en: 'coming soon',
      name_fr: 'Bientôt disponible',
      name_de: 'kommt bald',
    };
    var servicel = 'name_' + localStorage.getItem('language');
    Swal.fire({
      icon: 'info',
      title: this.coming[servicel],
    });
  }
  profile_pic: any;
  serviceLang: any;

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;

    var obj = {
      user_id: JSON.parse(localStorage.getItem('rest')).rest_id,
    };
    var locationServices = [];
    this.companiesService.getCompanyUser(obj).subscribe((company) => {
      this.profile_pic =
        'https://api.aroundorder.com:1337/api/user/' +
        JSON.parse(localStorage.getItem('rest')).rest_id +
        '/' +
        company.id +
        '/logo.png';
    });
    this.privileges = {
      create_new_auftrags: false,
      see_sent_auftrags: false,
      see_received_auftrags: false,
      create_new_invitations: false,
      see_sent_invitations: false,
      see_members: false,
      see_received_invitations: false,
      see_calendar: true,
      see_customers: false,
      cashbook: false,
      balancing_list: false,
      file_management: false,
      see_invoices: false,
      create_invoices: false,
      articles: false,
    };

    this.userConnected = JSON.parse(localStorage.getItem('main'));
    let user = {
      userId: this.userConnected.id,
    };

    //console.log(AppComponent.switched)
    //console.log(this.privileges)
    this.session = JSON.parse(localStorage.getItem('rest'));
    this.session_state = localStorage.getItem('switched');
    //console.log(this.session_state === "1")
    if (this.session_state.toString() === '1') {
      this.username = this.session.full_name;
      this.privileges = {
        create_new_auftrags: false,
        see_sent_auftrags: false,
        see_received_auftrags: false,
        create_new_invitations: false,
        see_sent_invitations: true,
        see_members: false,
        see_received_invitations: true,
        see_calendar: true,
        see_customers: true,
        cashbook: true,
        balancing_list: true,
        file_management: false,
        see_invoices: false,
        create_invoices: false,
        articles: false,
      };

      this.privileges = this.session.privileges;

      //console.log("this.privileges")
      //console.log(this.privileges)
      //console.log("this.privileges")
    } else {
      this.companiesService.getPrivilgesByUser(user).subscribe((data: any) => {
        var tmp: any = data.privileges;
        var tmp2: any = tmp.privileges;
        this.privileges = JSON.parse(tmp2);

        //console.log(this.privileges["invoices"])
      });
    }

    //console.log(this.userConnected)
    if (AppComponent.switched) {
      this.showBack == true;
    }
  }

  switchToUserAccount() {
    localStorage.setItem('rest', localStorage.getItem('main'));
    let object = {
      accessToken: this.userConnected.accessToken,
      rest_id: this.userConnected.id,
      session_key: this.userConnected.session_key,
      full_name:
        this.userConnected.first_name + ' ' + this.userConnected.last_name,
    };
    localStorage.setItem('rest', JSON.stringify(object));

    localStorage.setItem('switched', String(0));
    window.location.reload();
  }
  switchToCompany() {
    Swal.fire({
      title: 'Submit your secret code',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        //console.log(login)
        if (login) {
          let userId = {
            userId: this.userConnected.id,
          };
          let switched = {
            code: login,
          };
          this.companiesService.getAccessKeyByUser(userId).subscribe((data) => {
            if (data.message.code == login) {
              AppComponent.switched = true;
              this.companiesService
                .switchToCompany(switched)
                .subscribe((data) => {});
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    $('.main-wrapper').removeClass('slide-nav');
  }

  main() {}
  clickLogout() {
   
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
    if (!this.langCollapsed) {
      this.langCollapsed = true;
    }
  }

  lang() {
    this.langCollapsed = !this.langCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }

  logout() {
    /*let obj = {
      session: this.userConnected.session_key,
      userId: this.userConnected.id,
    };
    this.authService.logout(obj).subscribe((data) => {
      console.log(data);
      this.successExpired = data;
      if (this.successExpired.success) {
        localStorage.removeItem('id');
        window.location.href = 'http://localhost:4200/home';
      }
    });*/
    localStorage.clear();
    this.router.navigateByUrl('/').then((e) => {
      window.location.reload();
    });
  }
  gotoplateform() {
    this.router.navigateByUrl('/').then((e) => {
      window.location.reload();
    });
  }
  tests() {
    $('.main-wrapper').removeClass('slide-nav');
  }
  items = [
    {
      name: {
        name_en: 'About me',
        name_fr: 'À propos de moi',
        name_de: 'Über mich',
      },
      link: 'about-me',
    },
    {
      name: {
        name_en: 'Account Details',
        name_fr: 'Détails du compte',
        name_de: 'Kontodetails',
      },
      link: 'account-details',
    },
    {
      name: {
        name_en: 'Company Details',
        name_fr: "Détails de l'entreprise",
        name_de: 'Unternehmens-Details',
      },
      link: 'company-details',
    },
    {
      name: {
        name_en: 'Contact Details',
        name_fr: 'Détails du contact',
        name_de: 'Kontaktdetails',
      },
      link: 'contact-details',
    },
    {
      name: {
        name_en: 'Locations and Services',
        name_fr: 'Lieux et services',
        name_de: 'Standorte und Dienstleistungen',
      },
      link: 'location-and-services',
    },
    {
      name: {
        name_en: 'Platform and settings',
        name_fr: 'Plateforme et paramètres',
        name_de: 'Plattform und Einstellungen',
      },
      link: 'platform-and-settings',
    },
    {
      name: {
        name_en: 'Keywords',
        name_fr: 'Mots clès',
        name_de: 'Keywords',
      },
      link: 'keywords',
    },
    {
      name: {
        name_en: 'Banking accounts',
        name_fr: 'Comptes bancaires',
        name_de: 'Bankkonten',
      },
      link: 'banking-accounts',
    },
    {
      name: {
        name_en: 'Terms and conditions',
        name_fr: 'Termes et conditions',
        name_de: 'Geschäftsbedingungen',
      },
      link: 'terms-and-conditions',
    },
    {
      name: {
        name_en: 'Privacy policy and guidelines',
        name_fr: 'Politique de confidentialité',
        name_de: 'Datenschutzbestimmungen',
      },
      link: 'Privacy-policy-and-guidelines',
    },
  ];
}
