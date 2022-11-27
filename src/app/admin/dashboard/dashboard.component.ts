import { LocationStrategy } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/tandu-admin/authenticate.service';
import { CompaniesService } from '../services/companies_services/companies.service';
import { ClipboardService } from 'ngx-clipboard';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  language = localStorage.getItem('language');
  userConnected = JSON.parse(localStorage.getItem('main'));
  maincateg: any;
  alreadysuggested: boolean = false;
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

  copylink() {
    /* Get the text field */
    var copyText = document.getElementById('urll');

    /* Select the text field */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(this.compurl);

    /* Alert the copied text */
  }
  public: any = {
    languages: {
      name_en: 'See my public profile',
      name_fr: 'Voir mon profil public',
      name_de: 'Siehe mein öffentliches Profil',
    },
  };
  copy: any = {
    languages: {
      name_en: 'Copy profile link',
      name_fr: 'Copier le lien du profil',
      name_de: 'Profillink kopieren',
    },
  };
  serviceLang: any;
  currentLanguage: any;
  categories: any[] = [];
  SubCategories: any[] = [];
  categoryselected: any;
  modalRef: BsModalRef;
  constructor(
    private tokenStorageService: TokenStorageService,
    private locationStrategy: LocationStrategy,
    private companyService: CompaniesService,
    private _clipboardService: ClipboardService,
    private categservices: CategoriesService,
    private modalService: BsModalService,
    public categservies: CategoriesService,
    public translate: TranslateService,
    private categoryser: CategoriesServices,
    private router: Router
  ) {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    history.pushState(null, null, window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
  }
  fullName: any;
  users: any[] = [];
  companyConnected: any;
  compurl: any;
  showdashboard: boolean = false;
  onChange(deviceValue) {
    this.categories.forEach((e) => {});

    this.categories.forEach((e) => {
      if (e.id == this.categoryselected) {
        this.maincateg = e.name;
        let sub: any[] = e.sub_categories;

        sub.forEach((sub) => {
          let ser: any[] = sub.services;
          ser.forEach((ser) => {
            ser.languages = JSON.parse(ser.languages);
            let servobj: any = {
              name: ser.languages[this.serviceLang],
              id: ser.id,
              service: ser,
              type: 'service',
              categoy: e,
              sub_category: sub,
            };
            this.Allserviceslist.push(servobj);
          });
        });
      }
    });
  }
  Allserviceslist: any[] = [];
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.categservices.getallcategories().subscribe((res) => {});
    var obj = {
      user_id: this.userConnected.id,
    };
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
      this.companyService
        .getAllLocations({ companyId: this.companyConnected.id })
        .subscribe((data) => {
          let locations: any[] = data.locations;
          if (locations.length > 0) {
            this.showdashboard = true;
          }
        });
      let locations: any[] = company.locations;
      this.compurl =
        'https://tanduu.com/' + this.companyConnected.company_link;
    });
    this.categservies
      .getownsuggestions({ userId: this.userConnected.id })
      .subscribe((sugs) => {
        if (sugs.reqs.length > 0) {
          this.alreadysuggested = true;
        }
      });
    const slider = document.querySelector<HTMLElement>('.parent-draggable');
    this.fullName = JSON.parse(localStorage.getItem('rest')).full_name;
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
      mouseDown = false;
    };

    /* slider.addEventListener('mousemove', (e) => {
       e.preventDefault();
       if (!mouseDown) {
         return;
       }
       const x = e.pageX - slider.offsetLeft;
       const scroll = x - startX;
       slider.scrollLeft = scrollLeft - scroll;
     });*/

    // Add the event listeners
    /* slider.addEventListener('mousedown', startDragging, false);
     slider.addEventListener('mouseup', stopDragging, false);
     slider.addEventListener('mouseleave', stopDragging, false);*/
    this.username = JSON.parse(localStorage.getItem('rest')).full_name;
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    /* Morris Line Chart */
  }

  changeLanguage() {
    var e = $('#langSelect :selected').val();
    // this.translate.use(String(e));
    localStorage.removeItem('language');
    localStorage.setItem('language', String(e));
    this.language = localStorage.getItem('language');
  }
  showedit: boolean = false;
  completeservices() {
    // this.showedit = true;
    /* this.router.navigateByUrl('/step3').then(e => {
       window.location.reload();
       
     });*/
  
  }
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  onItemSelect(item: any) {}
  onSelectAll(items: any) {}
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
    this.companyConnected.street = street;
    this.companyConnected.street_number = street_nb;
    this.companyConnected.city = city;
    this.companyConnected.state = state;
    this.companyConnected.country = country;
    this.companyConnected.longitude = long;
    this.companyConnected.latitude = lat;
    this.companyConnected.zip_code = zip;

    let tmpser: any[] = [];
    this.selectedItems.forEach((e) => {
      tmpser.push(e.id);
    });
    this.companyConnected.hashtags = JSON.parse(this.companyConnected.hashtags);
    this.companyConnected.socials = JSON.parse(this.companyConnected.socials);
    this.companyConnected.main_category = this.maincateg;
    this.companyService
      .updateCompany(this.companyConnected)
      .subscribe((e) => {});
    if (city && long && lat) {
      this.modalRef.hide();
      localStorage.setItem(
        'addr_cs',
        JSON.stringify({ zip: zip, city: city, lng: long, lat: lat })
      );
      let obj = {
        distance: 0, //this.distance,
        companyId: this.companyConnected.id,
        title: '',
        city: city, //this.cityLocation,
        zip_code: zip, //this.zipCodeLocation,
        country: country,
        state: state,
        longitude: long, //this.longitudeLocation,
        latitude: lat, //this.latitudeLocation,
        is_active: 1,
        services: [],
      };

      this.companyService.addLocation(obj).subscribe((data) => {
        let locationObj = {
          id: data.data.id,
          services: tmpser,
          still_do: 1,
        };

        this.companyService
          .updateLocationServices(locationObj)
          .subscribe((data) => {
            window.location.reload();
          });
      });
    } else {
      if (!city) {
        alert(this.alert1.languages[this.serviceLang]);
      } else {
        alert(this.alert2.languages[this.serviceLang]);
      }
    }
  }
  suggestmsg: any = {
    languages: {
      name_en: " Didn't find what you look for ? suggest it",
      name_fr: "Vous n'avez pas trouvé ce que vous cherchez ? le suggérer",
      name_de: 'Nicht gefunden, was Sie suchen? Jetzt vorschlagen!',
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
  continue: any = {
    languages: {
      name_en: 'continue',
      name_fr: 'Continuez',
      name_de: 'Weiter',
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
      name_en: 'please enter the full address .',
      name_fr:
        "veuillez saisir l'adresse complète, y compris le numéro de la maison.",
      name_de:
        'Ungültige Adresse oder nicht gefunden! Wir können Ihre Position nicht lokalisieren. B',
    },
  };
  before: any = {
    languages: {
      name_en:
        'Before we can show your profile on search results , please specify your branch and the type of services you provide',
      name_fr:
        'Avant que nous puissions afficher votre profil dans les résultats de recherche, veuillez spécifier votre catégorie et le type de services que vous fournissez',
      name_de:
        'Bevor wir Ihr Profil in den Suchergebnissen anzeigen können, geben Sie bitte Ihre Branche und die Art der von Ihnen angebotenen Dienstleistungen an',
    },
  };
  complete: any = {
    languages: {
      name_en: 'Complete your profile',
      name_fr: 'complètez votre profil',
      name_de: 'vervollständige Ihre  Profil',
    },
  };
  ifyou: any = {
    languages: {
      name_en: "If you can't find your branch",
      name_fr: 'Si vous ne trouvez pas votre catégorie',
      name_de: 'Falls Sie Ihre Branche nicht finden',
    },
  };
  sugg: any = {
    languages: {
      name_en: 'Suggest new branch',
      name_fr: 'Suggérer une nouvelle gatégorie',
      name_de: 'Neue Branche vorschlagen',
    },
  };
  selectb: any = {
    languages: {
      name_en: 'Select branch',
      name_fr: 'sélectionner la gatégorie',
      name_de: 'Branche auswählen',
    },
  };
  selects: any = {
    languages: {
      name_en: 'Select services',
      name_fr: 'Sélectionnez les services',
      name_de: 'Dienst auswählen',
    },
  };
  suggfor: any = {
    languages: {
      name_en: 'Suggest services for this branch',
      name_fr: 'suggérer des services pour cette categorie',
      name_de: 'Dienstleistungen für diese Branche vorschlagen',
    },
  };
  next: any = {
    languages: {
      name_en: 'Next',
      name_fr: 'suivant',
      name_de: 'nächste',
    },
  };

  sas: any = {
    languages: {
      name_en: 'suggest another service',
      name_fr: 'suggérer un autre service',
      name_de: 'einen anderen Dienst vorschlagen',
    },
  };
  rem: any = {
    languages: {
      name_en: 'Remove Last',
      name_fr: 'Supprimer le dernier',
      name_de: 'Zuletzt entfernen',
    },
  };
  choose: any = {
    languages: {
      name_en: 'Choose branch',
      name_fr: 'choisir la categorie',
      name_de: 'Branche wählen',
    },
  };
  welcome: any = {
    languages: {
      name_en: 'Welcome to',
      name_fr: 'Bienvenue à',
      name_de: 'Willkommen zu',
    },
  };
  holderser: any = {
    languages: {
      name_en: 'exp(accompany children , transporting furniture ...) ',
      name_fr: 'exp( analyse du sol , Prestations anniversaires ...)  ',
      name_de: 'exp( Elektrische Heizungen ,Bäume und Pflanzen ... )  ',
    },
  };
  holdercat: any = {
    languages: {
      name_en: 'exp( Plumbery , Art & Music ....)',
      name_fr: 'exp( Charpenterie , Décoration ....)',
      name_de: 'exp( Rund ums Automobil  , Elektriker ...)',
    },
  };
  requestedmsg: any = {
      name_en:
        'We have received your suggestion. it will take a moment to confirm it, while you wait, you can update your profile for better visibility',
      name_de:
        'Wir haben Ihren Vorschlag erhalten. Die Bestätigung dauert einen Moment. Während Sie warten, können Sie Ihre Profil für eine bessere Sichtbarkeit aktualisieren',
      name_fr:
        'Nous avons bien reçu votre suggestion. il faudra un moment pour le confirmer, en attendant, vous pouvez mettre à jour votre profil pour une meilleure visibilité',
  };
  thanks: any = {
    languages: {
      name_en: 'Thank you',
      name_fr: 'Merci',
      name_de: 'Danke schön',
    },
  };
  gotoprof: any = {
    languages: {
      name_en: 'Go to profile settings',
      name_fr: 'Accéder aux paramètres du profil',
      name_de: 'Gehen Sie zu den Profileinstellungen',
    },
  };
  suggestedcategory: any;
  servicessuggestednumber: 1;
  suggestions: any[] = [{}];
  addcol() {
    this.servicessuggestednumber++;
    this.suggestions.push({});
  }
  // tslint:disable-next-line: typedef
  removecolfromaward() {
    this.servicessuggestednumber--;
    this.suggestions.pop();
  }
  numSequence(n: number): Array<number> {
    return Array(n)
      .fill(n)
      .map((x, i) => i);
  }
  onChangeEvent(i, t) {
    this.suggestions[i] = t.target.value;

    if (t.target.value != '') {
      this.showsug = true;
    }
  }
  showsug: boolean = false;
  suggestask: any = {
    languages: {
      name_en: 'Are you sure about submitting this suggestion?',
      name_fr: 'Voulez-vous vraiment soumettre cette suggestion ?',
      name_de: 'Sind Sie sicher, dass Sie diesen Vorschlag einreichen möchten?',
    },
  };
  submit: any = {
    languages: {
      name_en: "I'm sure",
      name_fr: 'Je suis sûr',
      name_de: 'Ich bin sicher',
    },
  }; 
  submitsuggestions() {
    Swal.fire({
      title: this.suggestask.languages[this.serviceLang],

      showCancelButton: true,
      confirmButtonText: this.submit.languages[this.serviceLang],
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let obj: any = {
          name: this.suggestedcategory,
          is_accepted: false,
          is_deleted: false,
          services: this.suggestions,
          requesterId: this.userConnected.id,
        };
        this.categservies.suggestcategory(obj).subscribe((e) => {
          window.location.reload();
        });
      }
    });
  }
  gotoprofile() {
    this.router.navigate(['/', this.userConnected.username]).then((e) => {
      window.location.reload();
    });
  }
}
