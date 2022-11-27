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
  selector: 'app-map-grid',
  templateUrl: './partners-search.component.html',
  styleUrls: ['./partners-search.component.css'],
})
export class MapGridComponent implements OnInit {
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
  services: number[] = [];
  nbrpartners: number;
  mapinfos: any[] = [];
  currentloc: any;
  loading: boolean;
  deviceInfo = null;
  notweb: boolean = false;
  searchLocationInfos: any;
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
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      (this.mapList = false), (this.mapGrid = true);
      this.notweb = true;
    } else {
      (this.mapList = true), (this.mapGrid = false);
      this.notweb = false;
    }
    this.searchLocationInfos = JSON.parse(localStorage.getItem('addr_cs'));

    this.origin = {
      lat: this.searchLocationInfos.lat,
      lng: this.searchLocationInfos.lng,
    };
    this.currentloc = new google.maps.LatLng(
      this.searchLocationInfos.lat,
      this.searchLocationInfos.lng
    );
  }

  currentLanguage: any;
  serviceLang: string;
  serviceLang2: any;
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = this.currentLanguage;
    this.serviceLang2 = 'name_' + this.currentLanguage;

    window.scroll(0, 0);
    this.currentuser = JSON.parse(localStorage.getItem('main'));

    this.loading = false;
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id.length == 1) {
        let int: number = params.id;
        this.services.push(int);
      } else {
        this.services = params.id;
      }

      this.companyser
        .getCompaniesByCity(this.services, this.searchLocationInfos.city)
        .subscribe((el: any) => {
          this.results = el;

          this.results.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);

            r.services = JSON.parse(r.services);
            r.services.forEach((elementz) => {
              elementz.service.languages = JSON.parse(
                elementz.service.languages
              );
            });
            r.services = r.services.slice(0, 3);

            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;

            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };
            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };
          });
          let filtred: any[] = [];
          this.results.forEach((puy) => {
            if (puy.company.show_card) {
              filtred.push(puy);
            }
          });
          this.nbrpartners = filtred.length;
          this.results1 = filtred.slice(0, 4);
          this.results2 = filtred.slice(4, this.results.length);

          this.loading = true;
        });
    });

    /** spinner starts on init */
  }
  gotobooking(partner: any) {
    localStorage.setItem('part', JSON.stringify(partner));

    localStorage.setItem('servs', JSON.stringify(this.services));

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
    this.results1 = this.results;
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
  searchfilter() {
    if (this.zipcodefilter != null && this.distance == 0) {
      this.companyser
        .getcompaniesbyserviceandlocation(this.services, this.zipcodefilter)
        .subscribe((el: any) => {
          this.results = el;

          this.nbrpartners = this.results.length;
          this.results.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.socials = JSON.parse(r.company.socials);

            r.company.socials.fb.link = 'https://' + r.company.socials.fb.link;

            r.company.socials.inst.link =
              'https://' + r.company.socials.inst.link;

            r.company.socials.lnk.link =
              'https://' + r.company.socials.lnk.link;

            r.company.socials.twt.link =
              'https://' + r.company.socials.twt.link;

            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);
            r.services = JSON.parse(r.services);

            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;
            r['origin'] = this.origin;
            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };

            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };

            r['distance'] = (
              Math.round(
                google.maps.geometry.spherical.computeDistanceBetween(
                  this.currentloc,
                  new google.maps.LatLng(r.latitude, r.longitude)
                )
              ) / 1000
            ).toFixed(2);
          });
          if (this.byrating) {
            this.results.sort(
              (n1, n2) => n2.company.average_rating - n1.company.average_rating
            );
          } else if (this.byprice) {
            this.results.sort((n1, n2) => n2.avgprice - n1.avgprice);
          }
          this.results1 = this.results.slice(0, 4);
          this.results2 = this.results.slice(4, this.results.length);

          this.loading = false;
        });
    } else if (this.zipcodefilter == null && this.distance == 0) {
      this.companyser
        .getcompaniesbyserviceandlocation(
          this.services,
          this.searchLocationInfos.zip
        )
        .subscribe((el: any) => {
          this.results = el;

          this.nbrpartners = this.results.length;
          this.results.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);
            r.services = JSON.parse(r.services);

            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;
            r['origin'] = this.origin;
            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };

            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };

            r['distance'] = (
              Math.round(
                google.maps.geometry.spherical.computeDistanceBetween(
                  this.currentloc,
                  new google.maps.LatLng(r.latitude, r.longitude)
                )
              ) / 1000
            ).toFixed(2);
          });
          if (this.byrating) {
            this.results.sort(
              (n1, n2) => n2.company.average_rating - n1.company.average_rating
            );
          } else if (this.byprice) {
            this.results.sort((n1, n2) => n2.avgprice - n1.avgprice);
          }
          this.results1 = this.results.slice(0, 4);
          this.results2 = this.results.slice(4, this.results.length);

          this.loading = false;
        });
    } else if (this.zipcodefilter == null && this.distance != 0) {
      this.results = [];
      this.results1 = [];
      this.results2 = [];
      this.companyser
        .getcompaniesbyserviceandlocation(
          this.services,
          this.searchLocationInfos.zip
        )
        .subscribe((el: any) => {
          let resultss: any[] = el;

          this.nbrpartners = this.results.length;
          resultss.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);
            r.services = JSON.parse(r.services);

            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;
            r['origin'] = this.origin;
            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };

            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };

            r['distance'] = (
              Math.round(
                google.maps.geometry.spherical.computeDistanceBetween(
                  this.currentloc,
                  new google.maps.LatLng(r.latitude, r.longitude)
                )
              ) / 1000
            ).toFixed(2);

            let dist2: number = parseFloat(
              (
                Math.round(
                  google.maps.geometry.spherical.computeDistanceBetween(
                    this.currentloc,
                    new google.maps.LatLng(r.latitude, r.longitude)
                  )
                ) / 1000
              ).toFixed(2)
            );

            if (dist2 - this.distance < 0) {
              this.results.push(r);
            }
          });
          if (this.byrating) {
            this.results.sort(
              (n1, n2) => n2.company.average_rating - n1.company.average_rating
            );
          } else if (this.byprice) {
            this.results.sort((n1, n2) => n2.avgprice - n1.avgprice);
          }
          this.results1 = this.results.slice(0, 4);
          this.results2 = this.results.slice(4, this.results.length);

          this.loading = false;
        });
    } else if (this.zipcodefilter != null && this.distance != 0) {
      this.results = [];
      this.results1 = [];
      this.results2 = [];
      this.companyser
        .getcompaniesbyserviceandlocation(this.services, this.zipcodefilter)
        .subscribe((el: any) => {
          let resultss: any[] = el;

          this.nbrpartners = this.results.length;
          resultss.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);
            r.services = JSON.parse(r.services);

            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;
            r['origin'] = this.origin;
            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };

            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };

            r['distance'] = (
              Math.round(
                google.maps.geometry.spherical.computeDistanceBetween(
                  this.currentloc,
                  new google.maps.LatLng(r.latitude, r.longitude)
                )
              ) / 1000
            ).toFixed(2);

            let dist2: number = parseFloat(
              (
                Math.round(
                  google.maps.geometry.spherical.computeDistanceBetween(
                    this.currentloc,
                    new google.maps.LatLng(r.latitude, r.longitude)
                  )
                ) / 1000
              ).toFixed(2)
            );

            if (dist2 - this.distance < 0) {
              this.results.push(r);
            }
          });
          if (this.byrating) {
            this.results.sort(
              (n1, n2) => n2.company.average_rating - n1.company.average_rating
            );
          } else if (this.byprice) {
            this.results.sort((n1, n2) => n2.avgprice - n1.avgprice);
          }
          this.results1 = this.results.slice(0, 4);
          this.results2 = this.results.slice(4, this.results.length);

          this.loading = false;
        });
    } else {
      this.companyser
        .getcompaniesbyserviceandlocation(
          this.services,
          this.searchLocationInfos.zip
        )
        .subscribe((el: any) => {
          this.results = el;

          this.nbrpartners = this.results.length;
          this.results.forEach((r: any) => {
            r.company.hashtags = JSON.parse(r.company.hashtags);
            r.company.socials = JSON.parse(r.company.socials);
            r.company.hashtags = r.company.hashtags.slice(0, 3);
            const img = new Image();
            img.src =
              'https://api.aroundorder.com:1337/api/user/' +
              r.company.id +
              '/profilepic.png';

            if (img.complete) {
            } else {
              img.onload = () => {
                r.company.imgurl = true;
              };

              img.onerror = () => {
                r.company.imgurl = false;
              };
            }
            let ss: any[] = JSON.parse(r.services);
            r.services = JSON.parse(r.services);
            let avg1: number = 0;
            ss.forEach((e: any) => {
              avg1 += (e.min_price + e.max_price) / 2;
            });
            r['avgprice'] = avg1;
            r['origin'] = this.origin;
            r['destination'] = {
              lat: r.latitude,
              lng: r.longitude,
            };

            r['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };

            r['distance'] = (
              Math.round(
                google.maps.geometry.spherical.computeDistanceBetween(
                  this.currentloc,
                  new google.maps.LatLng(r.latitude, r.longitude)
                )
              ) / 1000
            ).toFixed(2);
          });
          if (this.byrating) {
            this.results.sort(
              (n1, n2) => n2.company.average_rating - n1.company.average_rating
            );
          } else if (this.byprice) {
            this.results.sort((n1, n2) => n2.avgprice - n1.avgprice);
          }
          this.results1 = this.results.slice(0, 4);
          this.results2 = this.results.slice(4, this.results.length);

          this.loading = false;
        });
    }
  }
  checkitem(hashs: any) {
    if (this.services.indexOf(hashs.service.id.toString()) > -1) {
      return true;
    } else {
      return false;
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
          queryParams: { id: this.services },
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
}
