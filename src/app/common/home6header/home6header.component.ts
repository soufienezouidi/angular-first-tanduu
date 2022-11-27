import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
  TemplateRef,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
declare var $: any;
import { CommonServiceService } from './../../common-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CategoriesService } from 'src/app/services/categories.service';
import { TranslateService } from '@ngx-translate/core';
import { emitKeypressEvents } from 'readline';
import { element } from 'protractor';
import { data } from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
const SOCKET_ENDPOINT = 'https://realtime.aroundorder.com:3200';
@Component({
  selector: 'app-home6header',
  templateUrl: './home6header.component.html',
  styleUrls: ['./home6header.component.css'],
})
export class Home6headerComponent implements OnInit {
  searchServiceWebHeader6: any;

  languagesList: any[] = [
    /*  {
        lang: 'Arabic',
        symbol: 'ar',
      },*/

    {
      lang: 'English (US)',
      symbol: 'en',
    },

    {
      lang: 'French',
      symbol: 'fr',
    },
    {
      lang: 'German',
      symbol: 'de',
    },
  ];
  comrytmenu: boolean = true;
  isPatient: boolean = false;
  comlogo: boolean = true;
  whitelogo: boolean = false;
  pharmcart: boolean = false;
  page;
  splitVal;
  headerTop: boolean = false;
  admin_submenu: boolean = true;
  admin_menu: boolean = false;
  notweb: boolean = false;
  base;
  url1;
  cu: any;
  plz: any = 'Service : ';
  serviceLang: any;
  showlogintop: boolean = false;
  isMobile: boolean = false;
  categories: any[] = [];
  showButton: boolean = false;
  widthmob: any = { width: '230px', 'background-color': 'white' };
  widthmob1: any = { width: '230px', 'background-color': 'white' };
  widthmobbanner: any = { width: '460px', 'background-color': 'white' };
  selectedservice: any;
  modalRef: BsModalRef;
  Allserviceslist: any[] = [];
  Allinformationsneeded: any[] = [];
  showSuggestion: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public categservices: CategoriesService,
    private activeRoute: ActivatedRoute,
    public commonService: CommonServiceService,
    private deviceService: DeviceDetectorService,
    private modalService: BsModalService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
   /* this.categservices.getcategorieswithinfos().subscribe((e: any) => {
      this.categories = e;
      this.data = this.categories[0];
      this.categories.forEach((cat: any) => {
        this.data = this.categories;
        cat.languages = JSON.parse(cat.languages);
        let sub: any[] = cat.sub_categories;
        sub.forEach((sub) => {
          sub.languages = JSON.parse(sub.languages);
          let ser: any[] = sub.services;
          ser.forEach((ser) => {
            ser.languages = JSON.parse(ser.languages);
          });
        });
      });
    });*/

   /* this.categservices.getcategorieswithinfos().subscribe((e: any) => {
      let a: any[] = e;

      a.forEach((cat: any) => {
        cat.languages = JSON.parse(cat.languages);
        let catobj: any = {
          name: cat.languages[this.serviceLang],
          id: cat.id,
          type: 'category',
        };
        this.Allserviceslist.push(catobj);
        let sub: any[] = cat.sub_categories;

        sub.forEach((sub) => {
          sub.languages = JSON.parse(sub.languages);
        
          let ser: any[] = sub.services;
          ser.forEach((ser) => {
            ser.languages = JSON.parse(ser.languages);
            let servobj: any = {
              name: ser.languages[this.serviceLang],
              id: ser.id,
              type: 'service',
            };
            this.Allserviceslist.push(servobj);
          });
        });
      });
      ////console.log(this.Allserviceslist)
    });*/
    this.isMobile = this.deviceService.isMobile();
    this.cu = JSON.parse(localStorage.getItem('main'));

    if (this.isMobile) {
      this.widthmob = {
        width: window.innerWidth / 2 + 'px',
        'background-color': 'white',
      };
      this.widthmobbanner = {
        width: window.innerWidth + 'px',
        'background-color': 'white',
      };
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        var res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];
        if (event.url == '/home-slider-one') {
          this.headerTop = true;
        } else {
          this.headerTop = false;
        }
        if (event.url == '/pharmacy/cart') {
          this.pharmcart = true;
        } else {
          this.pharmcart = false;
        }
        if (!this.cu) {
          this.auth = false;
        } else {
          this.auth = true;
        }
        if (this.base === 'doctor') {
          this.isPatient = false;
        } else if (this.base === 'patients') {
          this.isPatient = true;
        }
        if (event.url == '/home-two') {
          this.admin_submenu = false;
          this.admin_menu = true;
          this.auth = false;
        } else if (event.url == '/home-slider-one') {
          this.admin_submenu = false;
          this.admin_menu = true;
          this.auth = false;
        } else if (event.url == '/home-slider-two') {
          this.admin_submenu = false;
          this.admin_menu = true;
          this.auth = false;
        } else {
          this.admin_submenu = true;
          this.admin_menu = false;
        }
        // if (event.url == '/home-four'){
        //   this.comrytmenu = false;
        //   this.hi4 = true;
        //   this.comlogo = false;
        //   this.whitelogo = true;
        // }
        // else if (event.url == '/home-six'){
        //   this.comrytmenu = false;
        //   this.hi7 = false;
        //   this.hi6 = true;
        // }
        // else if (event.url == '/home-seven'){
        //   this.comrytmenu = false;
        //   this.hi6 = false;
        //   this.hi7 = true;
        //   this.comlogo = false;
        //   this.whitelogo = true;
        // }
        // else if (event.url == '/home-eight'){
        //   this.comrytmenu = false;
        //   this.hi6 = false;
        //   this.hi7 = false;
        //   this.hi8 = true;
        //   this.comlogo = true;
        //   this.whitelogo = false;
        // }
        // else {
        //   this.comrytmenu = true;
        //   this.hi4 = false;
        //   this.hi7 = false;
        //   this.hi8 = false;
        // }
      }
    });
    this.url1 = this.router.url;
    this.commonService.message.subscribe((res) => {
      if (res === 'patientLogin') {
        this.auth = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
      }

      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
      }
    });
  }
  infos: any;
  deviceInfo = null;

  auth: boolean = false;
  userconnected: any;
  currentLanguage: any;
  showprofsets : boolean = true
  ngOnInit(): void {
    this.setupSocketConnection();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;

    this.userconnected = localStorage.getItem('main');

    if (this.userconnected != null) {
      if (JSON.parse(this.userconnected).user) {
        this.infos = JSON.parse(this.userconnected).user;
      } else {
        this.infos = JSON.parse(this.userconnected);
        if(JSON.parse(this.userconnected).roles[0]=== "ROLE_COMMERCIAL"){
          this.showprofsets = false ;
        }
        
      }

      if (JSON.parse(this.userconnected)) {
        this.auth = true;
      }
    }

    $(document).ready(function () {
      /* $('*').hover((e) => {
        var timeout: any = 0;
        const sl: HTMLElement = e.currentTarget;
        var inter2 = setInterval(() => {
          timeout += 1;
          if (timeout === 40 && !sl.className.includes('hovered-class')) {
            clearInterval(inter2);
            $('.card-nav').css('display', 'none');
            ////console.log(timeout);
            timeout = 0;
          }
        });
      });*/
      $('body').on('click', () => {
        $('.card-nav').css('display', 'none');
        $('#profile_menu').css('display', 'none');
      });
    });

    /* get location address */

    $();
  }
  gotologin() {
    this.router.navigateByUrl('login-page');
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
    this.commonService.nextmessage('main');
  }
  changeLanguage(lang: any) {
    this.translate.use(String(lang));
    localStorage.removeItem('language');
    localStorage.setItem('language', String(lang));
    window.location.reload();
  }
  showmodal() {
    $('#changeLanguages').modal('show');
  }
  mapGrid() {
    this.router.navigate(['/map-grid']);
  }

  mapList() {
    this.router.navigate(['/map-list']);
  }

  addStyle(val) {
    // if (val === 'home') {
    //   if (document.getElementById('home').style.display == 'block') {
    //     document.getElementById('home').style.display = 'none';
    //   } else {
    //     document.getElementById('home').style.display = 'block';
    //   }
    // }
    // if (val === 'doctor') {
    //   if (document.getElementById('doctor').style.display == 'block') {
    //     document.getElementById('doctor').style.display = 'none';
    //   } else {
    //     document.getElementById('doctor').style.display = 'block';
    //   }
    // }
    // if (val === 'patient') {
    //   if (document.getElementById('patient').style.display == 'block') {
    //     document.getElementById('patient').style.display = 'none';
    //   } else {
    //     document.getElementById('patient').style.display = 'block';
    //   }
    // }
    // if (val === 'pharmacy') {
    //   if (document.getElementById('pharmacy').style.display == 'block') {
    //     document.getElementById('pharmacy').style.display = 'none';
    //   } else {
    //     document.getElementById('pharmacy').style.display = 'block';
    //   }
    // }
    // if (val === 'pages') {
    //   if (document.getElementById('pages').style.display == 'block') {
    //     document.getElementById('pages').style.display = 'none';
    //   } else {
    //     document.getElementById('pages').style.display = 'block';
    //   }
    // }
    // if (val === 'invoice') {
    //   if (document.getElementById('invoice').style.display == 'block') {
    //     document.getElementById('invoice').style.display = 'none';
    //   } else {
    //     document.getElementById('invoice').style.display = 'block';
    //   }
    // }
    // if (val === 'blog') {
    //   if (document.getElementById('blog').style.display == 'block') {
    //     document.getElementById('blog').style.display = 'none';
    //   } else {
    //     document.getElementById('blog').style.display = 'block';
    //   }
    // }
    if (val === 'admin') {
      if (document.getElementById('admin').style.display == 'block') {
        document.getElementById('admin').style.display = 'none';
      } else {
        document.getElementById('admin').style.display = 'block';
      }
    }
  }

  doctor(name) {
    this.page = name;
    // this.router.navigate(['/doctor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/').then((e) => {
      window.location.reload();
    });
  }
  gotodashboard() {
    let role: string = this.infos.roles[0];
    if (role == 'ROLE_COMMERCIAL') {
      this.router.navigateByUrl('/commercial/dashboard').then((e) => {});
    }
    if (role == 'ROLE_ADMIN') {
      this.router.navigateByUrl('/admin/dashboard').then((e) => {});
    }
    if (role == 'ROLE_CUSTOMER') {
      this.router.navigateByUrl('/users/dashboard').then((e) => {});
    }
  }
  gotosettings() {
    let role: string = this.infos.roles[0];
    if (role == 'ROLE_COMMERCIAL') {
      this.router.navigateByUrl('/commercial/settings').then((e) => {});
    }
    if (role == 'ROLE_ADMIN') {
      this.router.navigateByUrl('/admin/settings').then((e) => {});
    }
    if (role == 'ROLE_CUSTOMER') {
      this.router.navigateByUrl('/users/settings').then((e) => {});
    }
  }
  home() {}
  gohome() {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }
  navigate(name) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      this.commonService.nextmessage('pharmacy-admin');
    }
  }
  inter: any;
  inter2: any;
  seconds: any = 0;
  seconds2: any = 0;
  data: any = {};
  data2: any = {};

  unhoverElement() {
    clearInterval(this.inter);
    $('*').on('mouseleave', (e) => {
      let l: HTMLBodyElement = e.currentTarget;

      if (
        l.className.includes('hovered-class') ||
        l.className.includes('home-banner ng-star-inserted') ||
        l.className.includes('drag-scroll-wrapper drag-scroll-container') ||
        l.className.includes('drag-scroll-content') ||
        l.className.includes(
          'dot-slider slider slick-initialized slick-slider'
        ) ||
        l.className == '' ||
        l.className.includes('ng-star-inserted')
      ) {
      } else {
        $('.card-nav').css('display', 'none');
      }
    });
    this.seconds = 0;
  }
  showcard(it: any) {
    if (!this.isMobile) {
      this.data = it;
      this.data2 = it.sub_categories[0];

      this.inter = setInterval(() => {
        this.seconds += 1;

        if (this.seconds === 20) {
          $('.card-nav').css('display', 'inline');
          this.unhoverElement();
        }
      });

      var marginLeft = $('#category-item' + it.id).offset().left;

      var marginRight = $(window).width() - marginLeft;

      if (marginRight < 480) {
        $('.sub-nav').css(
          'padding-left',
          marginLeft + -(480 - marginRight) + 33 + 'px'
        );
      } else {
        $('.sub-nav').css('padding-left', marginLeft + 33 + 'px');
      }

      $('#category-item' + it.id).css(
        'border-bottom',
        'solid 3px blue !important'
      );
    }
  }
  hidecard(it: any) {
    $('.card-nav').css('display', 'none');
  }
  showservice(itemz) {
    this.data2 = itemz;
  }
  serviceselected: any = {};
  gotoservice(items: any) {
    this.serviceselected = items;
    this.chosenservicess[0] = items.id;
  }
  chosenservicess: any = [];
  clicksearch(val: any): boolean {
    if (this.chosenservicess.indexOf(val.id) < 0) {
      return false;
    } else {
      return true;
    }
  }
  public bellCollapsed = true;

  bell() {
    this.bellCollapsed = !this.bellCollapsed;
  }

  showme: boolean = false;
  changeshowme() {
    this.showprofiledropdown = false;
    this.showlangdropdown = false;
    this.showme = !this.showme;
  }
  showprofiledropdown: boolean = false;
  showprofile() {
    this.showme = false;
    this.showlangdropdown = false;
    this.showprofiledropdown = !this.showprofiledropdown;
  }
  showlangdropdown: boolean = false;
  showlang() {
    this.showprofiledropdown = false;
    this.showme = false;

    this.showlangdropdown = !this.showlangdropdown;
  }
  gotologins() {
    this.showprofiledropdown = false;
    this.showme = false;

    this.showlangdropdown = false;
  }
  gogtosub(i) {
    this.router.navigate(['/category', i.name]).then((e) => {
      window.location.reload();
    });
  }
  openModalAddress(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  checkAddress() {
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };
    var autocomplete = new google.maps.places.Autocomplete(
      $('#address')[0] as HTMLInputElement,

      {}
    );

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];

          if (addressType == 'route') {
            $('#street').val(val);
            var street = $('#street').val();
          }
          if (addressType == 'street_number') {
            $('#street_nb').val(val);
            var street_nb = $('#street_nb').val();
          }
          if (addressType == 'locality') {
            $('#city').val(val);
            var ort = $('#city').val();
          }
          if (addressType == 'administrative_area_level_1') {
            $('#state').val(val);
            var state = $('#state').val();
          }
          if (addressType == 'country') {
            $('#country').val(val);
            var city = $('#country').val();
          }
          if (addressType == 'postal_code') {
            var code: any;
            if (val == null) {
              code = 0;
            } else {
              $('#zip_code').val(val);
              code = $('#zip_code').val();
            }
          }
        }
      }
      //this.addressInputs = true;
      var addressee1: any = city + '' + code;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: addressee1,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude_search = results[0].geometry.location.lat();
            var longitude_search = results[0].geometry.location.lng();
            $('#latitude').val(latitude_search);
            $('#longitude').val(longitude_search);
          }
        }
      );
    });
  }
  zipcode: any = null;
  city: any = null;

  searchLocation() {
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
      formatted_address: 'Phuket, Thailand',
    };
    var autocomplete = new google.maps.places.Autocomplete(
      $('#search-location')[0] as HTMLInputElement,
      {}
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];

        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];

          if (addressType == 'locality') {
            $('#search_city').val(val);
            var ort = $('#search_city').val();
          }
          if (addressType == 'postal_code') {
            $('#search_zip').val(val);
            var code = $('#search_zip').val();
          } else {
            $('#search_zip').val('');
          }
        }
      }

      //this.addressInputs = true;
      var addressee1: any = ort + '' + code;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: addressee1,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude_search = results[0].geometry.location.lat();
            var longitude_search = results[0].geometry.location.lng();
            $('#search_lng').val(latitude_search);
            $('#search_ltd').val(longitude_search);
          }
        }
      );
    });
    var city = $('#search_city').val();
    var zip = $('#search_zip').val();
    var long = $('#search_lng').val();
    var lat = $('#search_lat').val();

    if ($('#search-location').val() == '') {
      $('#search_city').val('');
      $('#search_zip').val('');
      $('#search_lng').val('');
      $('#search_ltd').val('');
    }
  }

  searchLocationMob(event: any) {
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
      formatted_address: 'Phuket, Thailand',
    };
    var autocomplete = new google.maps.places.Autocomplete(
      $(event)[0] as HTMLInputElement,
      {}
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];

        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];

          if (addressType == 'locality') {
            $('#search_citymob').val(val);
            var ort = $('#search_citymob').val();
          }
          if (addressType == 'postal_code') {
            $('#search_zipmob').val(val);
            var code = $('#search_zipmob').val();
          } else {
            $('#search_zipmob').val('');
          }
        }
      }

      //this.addressInputs = true;
      var addressee1: any = ort + '' + code;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: addressee1,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude_search = results[0].geometry.location.lat();
            var longitude_search = results[0].geometry.location.lng();
            $('#search_lngmob').val(latitude_search);
            $('#search_ltdmob').val(longitude_search);
            var city = $('#search_citymob').val();
            var zip = $('#search_zipmob').val();
            var long = $('#search_lngmob').val();
            var lat = $('#search_ltdmob').val();
            document.getElementById('search-location').focus();
          }
        }
      );
    });

    if ($(event).val() == '') {
      $('#search_citymob').val('');
      $('#search_zipmob').val('');
      $('#search_lngmob').val('');
      $('#search_ltdmob').val('');
    }
  }

  alert1: any = {
    languages: {
      name_en:
        'Invalid address. we cannot locate your position. Please try again',
      name_fr:
        'Adresse invalide. nous ne pouvons pas localiser votre position. Veuillez réessayer.',
      name_de:
        'Bitte geben Sie die vollständige Adresse einschließlich Hausnummer ein, um genaue Ergebnisse zu erzielen!',
    },
  };
  alert2: any = {
    languages: {
      name_en:
        'Invalid address. Zip code is mandatory for better search results',
      name_fr:
        'Adresse invalide. Le code postal est obligatoire pour de meilleurs résultats de recherche.r',
      name_de:
        'Ungültige Adresse oder nicht gefunden! Die Postleitzahl ist für bessere Suchergebnisse dringend erforderlich.',
    },
  };
  locationmsg: any = {
    languages: {
      name_en:
        'please enter the full address including house number for better results',
      name_fr:
        "veuillez saisir l'adresse complète, y compris le numéro de la maison, pour de meilleurs résultats.",
      name_de:
        'Ungültige Adresse oder nicht gefunden! Wir können Ihre Position nicht lokalisieren. Bitte ändern Sie etwas und versuchen Sie es erneut!,',
    },
  };
  searchSeletedService: any;

  goToSearchP() {
    var title = 'title_' + this.currentLanguage;
    var msgService = 'msg_service_' + this.currentLanguage;
    var msgAddress = 'msg_address_' + this.currentLanguage;

    let messageError = {
      title_en: 'Warning',
      title_de: 'Warnung',
      title_fr: 'Avertissement',
      msg_address_en: 'You should select valid address',
      msg_address_de: 'Sie sollten eine gültige Adresse auswählen',
      msg_address_fr: 'You should select service first',
      msg_service_en: 'You should select service first',
      msg_service_de: 'Sie sollten zuerst den Dienst auswählen',
      msg_service_fr: "Vous devez d'abord sélectionner le service",
    };
    var selectedService = this.searchSeletedService;

    var city = $('#search_city').val();
    var zip = $('#search_zip').val();
    var long = $('#search_lng').val();
    var lat = $('#search_ltd').val();

    if (!this.Finaleselectedservice) {
      localStorage.setItem(
        'addr_cs',
        JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
      );
      this.router.navigateByUrl('allcitypartners').then((e) => {
        window.location.reload();
      });
    } else {
      if (!city && !zip) {
        Swal.fire({
          icon: 'error',
          title: messageError[title],
          text: messageError[msgAddress],
        });
      } else {
        localStorage.setItem(
          'addr_cs',
          JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
        );
        if (this.Finaleselectedservice.type == 'category') {
        } else {
          this.router
            .navigate(['/partners_search'], {
              queryParams: { id: this.Finaleselectedservice.id },
            })
            .then((success) => {
              window.location.reload();
            });
        }
      }
    }
  }
  goToSearchPage() {
    var address = $('#address').val();
    var street = $('#street').val();
    var street_nb = $('#street_nb').val();
    var city = $('#city').val();
    var zip = $('#zip_code').val();
    var state = $('#state').val();
    var country = $('#country').val();
    var long = $('#longitude').val();
    var lat = $('#latitude').val();

    if (city && long && lat) {
      this.modalRef.hide();
      localStorage.setItem(
        'addr_cs',
        JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
      );
      this.router
        .navigate(['/partners_search'], {
          queryParams: { id: this.chosenservicess },
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      if (!city) {
        alert(this.alert1.languages[this.serviceLang]);
      } else {
        alert(this.alert2.languages[this.serviceLang]);
      }
    }
  }

  goToSearchMobile() {
    var title = 'title_' + this.currentLanguage;
    var msgService = 'msg_service_' + this.currentLanguage;
    var msgAddress = 'msg_address_' + this.currentLanguage;

    let messageError = {
      title_en: 'Warning',
      title_de: 'Warnung',
      title_fr: 'Avertissement',
      msg_address_en: 'You should select valid address',
      msg_address_de: 'Sie sollten eine gültige Adresse auswählen',
      msg_address_fr: 'You should select service first',
      msg_service_en: 'You should select service first',
      msg_service_de: 'Sie sollten zuerst den Dienst auswählen',
      msg_service_fr: "Vous devez d'abord sélectionner le service",
    };
    var selectedService = this.searchSeletedService;
    var city = $('#search_citymob').val();
    var zip = $('#search_zipmob').val();
    var long = $('#search_lngmob').val();
    var lat = $('#search_ltdmob').val();
    if (!selectedService) {
      localStorage.setItem(
        'addr_cs',
        JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
      );
      this.router.navigateByUrl('allcitypartners').then((e) => {
        window.location.reload();
      });
    } else {
      if (!city && !zip) {
        Swal.fire({
          icon: 'error',
          title: messageError[title],
          text: messageError[msgAddress],
        });
      } else {
        localStorage.setItem(
          'addr_cs',
          JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
        );
        this.router
          .navigate(['/partners_search'], {
            queryParams: { id: selectedService },
          })
          .then((success) => {
            window.location.reload();
          });
      }
    }
  }
  nextArray: any[] = [];
  newArr: any[] = [];
  splitArray: any[] = [];
  other: any[] = [];
  result_search: any;
  searchServices(value: any) {
    this.searchServiceWebHeader6 = value;
    this.sendjoinreq(value);
    if (value) {
      this.showSuggestion = true;
      var sp = value.split(' ');
      for (var i = 0; i < sp.length; i++) {
        if (!this.isEmptyOrSpaces(sp[i])) {
          //console.log(this.filterItems(this.Allserviceslist, sp[i]));

          this.newArr = this.filterItems(this.Allserviceslist, sp[i]);
        }
      }
      this.result_search = this.newArr;
    } else {
      this.result_search = [];
      this.searchSeletedService = null;
      this.showSuggestion = false;
    }
  }
  searchServicesmob(value: any) {
    if (value) {
      this.showSuggestion = true;
      var sp = value.split(' ');
      for (var i = 0; i < sp.length; i++) {
        if (!this.isEmptyOrSpaces(sp[i])) {
          this.newArr = this.filterItems(this.Allserviceslist, sp[i]);
        }
      }
      this.result_search = this.newArr;
    } else {
      this.result_search[0] = $('#search-service').val();
      this.searchSeletedService = null;
      this.showSuggestion = false;
    }
  }
  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  filterItems(arr: any, query: any) {
    return arr.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  Finaleselectedservice: any;
  selectService(id: any, name: any, item: any) {
    //localStorage.setItem("serviceId", id);
    $('input[name=search6]').focus();
    this.Finaleselectedservice = item;
    this.searchSeletedService = id;
    this.sendjoinreq(name);
    this.searchServiceWebHeader6 = name;
    this.showSuggestion = false;
  }
  selectServicemob(id: any, name: any, item: any) {
    //localStorage.setItem("serviceId", id);

    this.searchSeletedService = id;
    $('#search-service-mob').val(name);
    this.showSuggestion = false;
  }
  gotodashbard() {
    if (this.cu.roles[0] === 'ROLE_ADMIN') {
      this.router
        .navigateByUrl('/admin/dashboard')
        .then((e) => window.location.reload());
    }
    if (this.cu.roles[0] === 'ROLE_COMMERCIAL') {
      this.router.navigateByUrl('/commercial/dashboard').then((e) => {});
    }
    if (this.cu.roles[0] === 'ROLE_CUSTOMER') {
      this.router
        .navigateByUrl('/users/dashboard')
        .then((e) => window.location.reload());
    }
    if (this.cu.roles[0] == 'ROLE_TANDUU_ADMIN') {
    
      
      this.router.navigateByUrl('/tanduu-admin').then(() => {
        window.location.reload();
      });
    }
  }
  gotoprofilesetting() {
    if (this.cu.roles[0] === 'ROLE_ADMIN') {
      this.router.navigateByUrl('/admin/profile?settings=about-me')
        .then((e) => window.location.reload());
    }
  }
  socket: any;

  sendjoinreq(txt: string) {
    this.socket.emit('search-engine-type', {
      message: txt,
    });
  }
  results: any[] = [];
  results1: any[] = [];
  results2: any[] = [];
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, { secure: true });

    this.socket.on('connection', (data: string) => {
      if (data) {
      }
    });

    this.socket.on('message-from-search-engine-server', (data: any) => {
      let arrresults: any[] = data.text;
    
      let prearrayser: any[] = [];
      let prearraycom: any[] = [];

      arrresults.forEach((e) => {
        if (e.type == 'service') {
          prearrayser.push({id : e.id , name: e[this.serviceLang]});
        } else {
          prearraycom.push(e);
        }
      });
      
      this.results1 = Object.values(
        prearrayser.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {}
        )
      );
      this.results2 = Object.values(
        prearraycom.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {}
        )
      );
  
      /* if (this.newArr.length == 0) {
        let o: any = {
          text: this.searchServiceWebHeader1,
          number: this.results.length,
        };
        this.other[0] = o;
      }*/
      if (this.newArr.length == 0) {
        let o: any = {
          text: this.searchServiceWebHeader6,
          number: this.results1.length,
        };
        this.other[0] = o;
      }
    });
  }
  onemo : any={
    languages : {
      name_en : "One Moment please! We are Searching for Results",
      name_de : "Einen Moment bitte! Wir suchen nach Ergebnissen",
      name_fr : "Un instant s'il vous plaît! Nous recherchons des résultats",
    }
  }
  sear : any={
    languages : {
      name_en : "Searching ...!",
      name_de : "En train de chercher ...!",
      name_fr : "Suchen ...!",
    }
  }
  gotoresults() {
    let ids: any[] = [];
    this.results2.forEach((e) => {
      ids.push(e.id);
    });
    this.showSuggestion = false;
    localStorage.setItem('sr', JSON.stringify(ids));
    let timerInterval
    Swal.fire({
      html:  this.onemo.languages[this.serviceLang],
      width : '250px',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b : any = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router
      .navigate(['/search_results'], {
        queryParams: { search: this.searchServiceWebHeader6 },
      })
      .then(() => {
        window.location.reload();
      });
      }
    })
    
  }


}
