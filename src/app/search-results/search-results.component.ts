import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from './../services/company.service';

import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { Observable, Observer, zip } from 'rxjs';
import { url } from 'inspector';
import Swal from 'sweetalert2';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppComponent } from '../app.component';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  slider;
  infowindow = null;
  bounds = new google.maps.LatLngBounds();
  geocoder = new google.maps.Geocoder();
  map;
  doc_name;
  current = 0;
  origin: any;
  content: any;
  results1: any[] = [];
  results2: any[] = [];
  mapGrid = false;
  mapList = true;
  currentuser: any;
  results: any[] = [];
  companies: number[] = [];
  nbrpartners: number;
  mapinfos: any[] = [];
  currentloc: any;
  loading: boolean;
  deviceInfo = null;
  notweb: boolean = false;
  searchLocationInfos: any;
  ids: any[] = [];
  isMobile: any;
  showmapview() {
    this.showmap = !this.showmap;
  }
  geocode(latlng: google.maps.LatLng) {}
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private companyser: CompanyService,
    private modalService: BsModalService,
    private deviceService: DeviceDetectorService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
    this.deviceInfo = this.deviceService.getDeviceInfo();

    this.isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (this.isMobile) {
      (this.mapList = false), (this.mapGrid = true);
      this.notweb = true;
    } else {
      (this.mapList = true), (this.mapGrid = false);
      this.notweb = false;
    }
  }

  currentLanguage: any;
  serviceLang: string;
  serviceLang2: any;
  listCompanies: any[] = [];
  filtred: any[] = [];
  searchtext: any;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      //console.log(params);
      this.searchtext = params.search;
      $('#search-service').val(this.searchtext);
    });

    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = this.currentLanguage;
    this.serviceLang2 = 'name_' + this.currentLanguage;
    this.ids = JSON.parse(localStorage.getItem('sr'));

    window.scroll(0, 0);
    this.currentuser = JSON.parse(localStorage.getItem('main'));
    if (this.ids.length == 0) {
      this.nbrpartners = 0;
    }

    if (this.ids.length > 0) {
      let p: any = {
        IdsCompanies: this.ids,
      };

      this.companyser.getAllcompaniesbyid(p).subscribe((results: any) => {
        this.listCompanies = results.companies;

        this.listCompanies.forEach((puy) => {
          if (puy.category) {
            puy.category.languages = JSON.parse(puy.category.languages);
          }

          puy.socials = JSON.parse(puy.socials);
          puy.hashtags = JSON.parse(puy.hashtags).slice(0, 5);

          puy['url'] =
            'https://api.aroundorder.com:1337/api/user/' +
            puy.userId +
            '/' +
            puy.id +
            '/logo.png';
          puy['cover'] =
            'https://api.aroundorder.com:1337/api/user/' +
            puy.userId +
            '/' +
            puy.id +
            '/cover.png';
          puy['destination'] = {
            lat: puy.latitude,
            lng: puy.longitude,
          };
          this.companyser.getserviesbycompany(puy.id).subscribe((ee) => {
            let arr: any[] = [];
            if (ee.services) {
              JSON.parse(ee.services).forEach((e) => {
                if (e.service) {
                  e.service.languages = JSON.parse(e.service.languages);
                  arr.push(e);
                }
              });
              puy.services = arr.slice(0, 3);
            }

            puy['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };
          });

          if (puy.show_card) {
            this.filtred.push(puy);
          }
        });

        this.nbrpartners = this.filtred.length;
        this.results1 = this.filtred;

        this.results2 = this.filtred.slice(4, this.results.length);

        this.loading = false;
      });
    }

    /** spinner starts on init */
  }
  showmap: boolean = false;
  gotobooking(partner: any) {
    localStorage.setItem('part', JSON.stringify(partner));

    localStorage.setItem('servs', JSON.stringify(this.companies));

    // Navigate to the login page with extras
    this.router.navigate(['/users/checkout']);
  }
  gotobooking1(partner: any) {
    Swal.fire({
      text: 'This service will be available soon.',
      imageUrl: 'https://api.aroundorder.com:1337/banners/comingsoon.jpeg',
      imageWidth: 330,
      imageHeight: 240,
      imageAlt: 'Custom image',
      width: 340,
    });
  }
  counter(i: number) {
    return new Array(i);
  }

  showfiltermodal() {}
  modalRef: BsModalRef;
  suggservice(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }
  decline() {
    this.modalRef.hide();
  }
  distance: number = 0;
  formatLabel(value: number) {
    if (value >= 0) {
      return Math.round(value / 1) + 'k';
    }

    return value;
  }
  fontStyleControl = new FormControl();
  fontStyle?: string;
  onInputChange(event: MatSliderChange) {
    this.distance = event.value;
  }
  loadmore() {
    this.results1 = this.listCompanies;
  }
  byrating: boolean = false;
  byprice: boolean = false;
  setbyrating() {
    this.byrating = !this.byrating;
    this.byprice = false;
  }
  setbyprice() {
    this.byprice = !this.byprice;
    this.byrating = false;
  }
  zipcodefilter: number = null;

  checkitem(hashs: any) {
    if (this.companies.indexOf(hashs.service.id.toString()) > -1) {
      return true;
    } else {
      return false;
    }
  }
  show: any = {
    languages: {
      name_en: 'Show results in map',
      name_fr: 'Afficher les résultats sur la carte',
      name_de: 'Ergebnisse in Karte anzeigen',
    },
  };
  hide: any = {
    languages: {
      name_en: 'Hide map',
      name_fr: 'Masquer la carte',
      name_de: 'Karte ausblenden',
    },
  };
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
  mapGridClick() {
    this.mapGrid = true;
    this.mapList = false;
    document.getElementById('list-view').classList.remove('active');
    document.getElementById('grid-view').classList.add('active');
  }
  mapListClick() {
    this.mapGrid = false;
    this.mapList = true;
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
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
          queryParams: { id: this.companies },
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      alert(
        'Invalid address. we cannot locate your position. Please try again'
      );
    }
  }
  gotoprofile(item) {
    window.open('/' + item.company_link, '_blank');
  }
}
