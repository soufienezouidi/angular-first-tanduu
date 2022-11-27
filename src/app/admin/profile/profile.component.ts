import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { ResizedEvent } from 'angular-resize-event';
import { FormControl, FormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  ToolbarItems,
  GridComponent,
  change,
} from '@syncfusion/ej2-angular-grids';
import { BankAccounts } from '../services/bank_accounts/bank-accounts.service';
import { ShopService } from '../services/shop_galeries/shop.service';
import { CompaniesService } from '../services/companies_services/companies.service';
import { ServicesService } from '../services/categories/services.service';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import { MatListModule } from '@angular/material/list';
import { TagModel } from 'ngx-chips/core/accessor';
import { Observable, of, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import { parse } from 'path';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { E, I, V } from '@angular/cdk/keycodes';
import { MapsAPILoader } from '@agm/core';
import { stringify } from 'querystring';
import { TranslateService } from '@ngx-translate/core';
import { Select2OptionData } from 'ng-select2';
import { MatGridListModule } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/services/categories.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CompanyService } from 'src/app/services/company.service';

declare var $: any;
declare var selection: any;
declare var valueKey: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentLanguage: any;
  locationTitle: any = {
    name_en: 'Add location',
    name_fr: 'Ajouter un lieu',
    name_de: 'Ort hinzufügen',
  };
  panelOpenState = false;
  patch_panel_array: Select2OptionData[];
  language = localStorage.getItem('language');
  showTermsText: any = true;
  showTermsTextDe: any = true;
  showTermsTextFr: any = true;
  modalRef: BsModalRef;
  showInfo: boolean = false;
  expandedIndex = 0;
  showDescriptionField: any = false;
  id: any;
  regexEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  terms: any;
  nbreKeywords: any = 0;
  suggestNew: any = false;
  servicesToUpdate: any[] = [];
  servicesSelected: any[] = [];
  doctorDetails: any;
  emailSignature: any;
  infowindow = null;
  showEmailSignature: any = true;
  mapClickListener: any;
  isMobile: boolean;
  hashtags: any;
  zone: any;
  distance: any = 50;
  showUpdateCompany: any = false;
  showJobTitleField: any = true;
  showCompanyDetailsUpdate: any = false;
  bounds = new google.maps.LatLngBounds();
  map: any;
  mapGrid = true;
  mapList = false;
  userObject: any = JSON.parse(localStorage.getItem('rest'));
  userConnected: any;
  companyConnected: any;
  newConfirmFailed: any = false;
  oldPasswordFailed: any = false;
  securityFailed: any = false;
  securitySuccess: any = false;
  accountSuccess: any = false;
  phonesList: any;
  descriptionPhone: any;
  newPhoneNumber: any;
  updatedDescriptionPhone: any;
  updatedNewPhoneNumber: any;
  phoneObject: any;
  phoneFound: any = false;
  newPhoneFound: any = false;
  showPersonalUpdate: any = false;
  listBanks: any = [];
  accountOwner: any;
  bankName: any;
  swiftBic: any;
  allCategories: any;
  allSub: any;
  allServices: any;
  rib: any;
  iban: any;
  lat: any = 51.678418;
  lng: any = 7.809007;
  zoom: number = 8;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  public data: object[];
  public toolbarOptions: ToolbarItems[];
  public pageSettings: Object;

  @ViewChild('search') searchElementRef: ElementRef;
  public grid: GridComponent;
  description: any;
  addressObject: any;
  contactObject: any;
  personalInfo: any;
  bankNameDeleted: BsModalRef;
  bankNameEdited: any;
  marker: any;
  //mapsAPILoader: any;
  currentLocation: string;
  objectLocationAddress: any;
  zipCodeLocation: any;
  cityLocation: any;
  stateLocation: any;
  countryLocation: any;
  latitudeLocation: any;
  longititudeLocation: any;
  loadingFormsLocation: boolean = false;
  longitudeLocation: any;
  locationRow: any;
  locationById: any;
  showListServices: any;
  idLocation: any;
  suggestCategories: any;
  level1: any = true;
  level2: any = false;
  level3: any = false;
  listShopProducts: any[] = [];
  listGalerie: any[] = [];
  ProductName: any;
  productName: any;
  productPrice: any;
  productPicture: any;
  productLink: any;
  productArticles: any;
  allProducts: any[] = [];
  settings: any;
  showSocials: any = false;
  socials: any;
  settingName: any;
  settingPath: any;
  mainCategory: any;
  showPersonalInfoEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public Router: Router,
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
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    this.activatedRoute.queryParams.subscribe((params) => {
      //////// // // ////conslog(params);
      this.settingName = this.getSettingName(params.settings);

      this.settingPath = params.settings;
      if (this.settingName == 'Keywords') {
        alert('ssssss');
      }
      ////////////console.log(this.settingName);
    });
  }

  listSelectionChanged(e) {
    //  this.currentHotel = e.addedItems[0];
    //////// // // ////conslog(this.currentHotel);
    //////// // // ////conslog(e);
  }
  NoServicesSelected: any = {
    name_en:
      "It looks like you haven't selected any services. Be sure to add the services you offered in certain locations to keep adding keywords.",
    name_fr:
      "Il semble que vous n'ayez sélectionné aucun service. Assurez-vous d'ajouter les services que vous proposiez dans certaines zones géographiques pour continuer à ajouter des mots clés.",
    name_de:
      'Anscheinend haben Sie keine Dienste ausgewählt. Stellen Sie sicher, dass Sie die Dienste hinzufügen, die Sie in bestimmten Regionen angeboten haben, um weitere Keywords hinzuzufügen.',
  };
  dirs: any[] = [
    {
      origin: 'aaa',
      destination: 'bbb',
      renderOptions: { polylineOptions: { strokeColor: '#f00' } },
    },
    {
      origin: 'ccc',
      destination: 'ddd',
      renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
    },
  ];
  selectAllKeywords(id: any) {
    if ($('#flexCheckCheckedAll' + id).is(':checked')) {
      $('.flexCheckChecked' + id).prop('checked', true);
    } else {
      $('.flexCheckChecked' + id).prop('checked', false);
    }
  }
  capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  selectedCar: number;
  mapView: boolean = false;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  searchText = '';
  characters = [
    'Plumbing Services',
    'Tube purification',
    'Insects control',
    'Child keeper',
    'Houses and buildings hygiene ',
  ];
  markers: any;
  locations: [] = [];
  locationsServices: any[] = [];
  currentHotel: any;
  deviceType: any;
  serviceLang: any;
  AddressPlaceholder: any = {
    name_en: 'search for address',
    name_fr: "recherche d'adresse",
    name_de: 'Adresse suchen',
  };
  mapview: any = {
    languages: {
      name_en: 'map view',
      name_fr: 'vue de la carte',
      name_de: 'Kartenansicht',
    },
  };
  locsandservices: any = {
    languages: {
      name_en: 'add services',
      name_fr: 'ajouter des services',
      name_de: 'Dienste hinzufügen',
    },
  };
  placeholdersearch: any = {
    languages: {
      name_en: 'Type service or branch name here',
      name_fr: 'Tapez le nom du service ou de la catégorie ici',
      name_de: 'Geben Sie hier den Dienst- oder Filialnamen ein',
    },
  };
  addnewloc: any = {
    languages: {
      name_en: 'add a new location',
      name_fr: 'ajouter une nouvelle localisation',
      name_de: 'einen neuen Standort hinzufügen',
    },
  };
  addnewgalley: any = {
    languages: {
      name_en: 'add a new gallery',
      name_fr: 'ajouter une nouvelle galerie',
      name_de: 'neue Galerie hinzufügen',
    },
  };
  addnewproduct: any = {
    languages: {
      name_en: 'add product',
      name_fr: 'ajouter un produit',
      name_de: 'Produkt hinzufügen',
    },
  };
  addNewCatalog: any = {
    languages: {
      name_en: 'add new Catalog',
      name_fr: 'ajouter un nouveau catalogue',
      name_de: 'neuen Katalog hinzufügen',
    },
  };
  deletecatag: any = {
    languages: {
      name_en: 'Delete catalgo',
      name_fr: 'supprimer le catalogue',
      name_de: 'Katalog löschen',
    },
  };
  placeholderFilter: any;
  ServicesSelectSettings: any;
  ServicesSelectSettings2: any;
  textStart: any;
  selectLocation;
  noAvailableData: any;
  textStartWords: any;
  chooseTermTex: any = {
    name_en: 'Choose the terms or word-group that best match your business',
    name_fr:
      'Choisissez les termes ou le groupe de mots qui correspondent le mieux à votre entreprise',
    name_de:
      'Wählen Sie die Begriffe oder Wortgruppen aus, die am besten zu Ihrem Unternehmen passen',
  };
  chooseTermNotFound: any = {
    name_en:
      'You miss something here? in the adjacent field, you can suggest further search terms or services!',
    name_fr:
      "Vous manquez quelque chose ici? dans le champ adjacent, vous pouvez suggérer d'autres termes de recherche ou services !",
    name_de:
      'Sie vermissen hier etwas?  Feld unten können Sie weitere Suchbegriffe oder Dienstleistungen vorschlagen!',
  };
  chooseTermcreate: any = {
    name_en:
      'If you want to create a list of relevant keywords yourself, add your own keywords below. Keywords can trigger ads to appear when users search for related terms. You can add up to 5 of your own keywords for free',
    name_fr:
      "Si vous souhaitez créer vous-même une liste de mots-clés pertinents, ajoutez vos propres mots-clés ci-dessous. Les mots clés peuvent déclencher l'affichage d'annonces lorsque les utilisateurs recherchent des termes associés. Vous pouvez ajouter jusqu'à 5 de vos propres mots-clés gratuitement",
    name_de:
      'Wenn Sie selbst eine Liste relevanter Keywords erstellen möchten, fügen Sie unten Ihre eigenen Keywords hinzu. Keywords können die Anzeigenschaltung auslösen, wenn Benutzer nach verwandten Begriffen suchen. Sie können bis zu 5 eigene Keywords kostenlos hinzufügen',
  };
  chooseTermwhich: any = {
    name_en: 'which service do you offer in this field of business?',
    name_fr: "quel service offrez-vous dans ce domaine d'activité?",
    name_de: 'Welchen Service bieten Sie in diesem Geschäftsfeld an?',
  };
  newLine: any = {
    name_en: 'Only 5 keywords allowed for each field of business',
    name_fr: "Seulement 5 mots clés autorisés pour chaque domaine d'activité.",
    name_de: 'Pro Geschäftsfeld sind nur 5 Keywords erlaubt.',
  };
  noComma: any = {
    name_en: 'No comma!',
    name_fr: 'Pas des virgules!',
    name_de: 'Kein Komma!',
  };
  specialCaracters: any = {
    name_en:
      'No special characters @ / & % $ § ( ) “ “ .de .com www http 0-9 ” allowed!',
    name_fr:
      'Aucun caractère spécial @ / & % $ § ( ) “ “ .de .com www http 0-9 ” autorisé!',
    name_de:
      'keine Sonderzeichen @ / & % $ § ( ) „ „ .de .com www http 0-9 “ erlaubt!',
  };
  alertRule: any = {
    name_en:
      'If you abuse this feature for keyword spamming or other unauthorized actions, your account will be blocked immediately and without prior warning!',
    name_fr:
      "Si vous abusez de cette fonctionnalité pour du spam par mot-clé ou d'autres actions non autorisées, votre compte sera bloqué immédiatement et sans avertissement préalable!",
    name_de:
      'Wenn Sie diese Funktion für Keyword-Spamming oder andere nicht autorisierte Aktionen missbrauchen, wird Ihr Konto sofort und ohne vorherige Warnung gesperrt!',
  };
  addBreaks(s, c) {
    var l = s.length;
    var i = 0;
    while (l > c) {
      l = l - c;
      i = i + c;
      s = s.substring(0, c) + '\n' + s.substring(c);
    }
    return s;
  }
  countCaracaters(event: any, id: any, txtar: any) {
    if (!event.value) {
      this.numberCaracters = 0;
    }
    /* if (this.solucao(event.value.length, 28) === true) {
      this.numberCaracters = 0;
    } else {
      this.numberCaracters += 1;
    }*/

    let finalVal = event.value;
    // this.numberCaracters = finalVal.length;
    ////////////////////////console.log(finalVal);
    $('#termsWordsList' + id).val(finalVal);
    this.countKeywords(id);
    this.verifiyCaracters(id, event.value);
    //this.countCaractersNumber(id);
  }
  numberCaracters: any = 0;
  solucao(numero: any, x: any) {
    if (numero % x == 0) {
      return true;
    } else {
      return false;
    }
  }
  messageAlert: any;
  showmessage: boolean = false;
  verifiyCaracters(id: any, text: any) {
    let arr2: any[] = [];
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    this.messageAlert = '';
    this.showmessage = false;
    let message = {
      name_en: 'Each keyword must contain only 30 caratcers',
      name_fr: 'Chaque mot-clé ne doit contenir que 30 caractères',
      name_de: 'Jedes Schlüsselwort darf nur 30 Zeichen enthalten',
    };
    let messageExce = {
      name_de: 'Sie können nur 5 Wortgruppen hinzufügen',
      name_en: 'you can only add 5 words-groups',
      name_fr: 'vous ne pouvez ajouter que 5 groupes de mots',
    };
    let arr: any[] = [];
    arr = $('#termsWordsList' + id)
      .val()
      .split('\n');
    let ii = 0;

    if (arr.length > 5) {
      this.showmessage = true;
      this.messageAlert = messageExce[this.serviceLang];
    }

    arr.forEach((el, i) => {
      this.numberCaracters = el ? el.length : 0;
      ii += el.length;

      if (el.length > 29) {
        this.showmessage = true;

        this.messageAlert = message[this.serviceLang];
        this.numberCaracters = el.length;
      }
      if (format.test(el)) {
        this.messageAlert = this.specialCaracters[this.serviceLang];
        this.showmessage = true;
      }
    });
  }
  checkAvailability(arr: any, val: any) {
    return arr.some((arrVal) => val === arrVal);
  }
  countCaractersNumber(id: any) {
    var numberOfLineBreaks: any;
    var text = $('#termsWordsList' + id).val();
    const enteredText = text;
    const enteredTextEncoded = escape(enteredText);
    const linebreaks = enteredTextEncoded.match(/%0A/g);
    linebreaks !== null
      ? (this.numberCaracters = linebreaks.length)
      : (this.numberCaracters = 0);

    ////////////////////////console.log(this.numberCaracters);
  }
  noAvailabless: any;
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    /* location section */
    this.placeholderFilter = {
      name_en: 'search ',
      name_fr: 'chercher',
      name_de: 'Suche',
    };
    this.textStart = {
      name_en: 'select location to edit ',
      name_fr: "sélectionnez l'emplacement à modifier",
      name_de: 'Standort zum Bearbeiten auswählen',
    };
    this.textStartWords = {
      name_en: 'search for a word or group of words',
      name_fr: 'rechercher un mot ou un groupe de mots',
      name_de: 'Suche nach einem Wort oder einer Wortgruppe',
    };

    this.noAvailableData = {
      name_en: 'No location found',
      name_fr: 'Aucune lieu trouvée',
      name_de: 'Keine Filiale gefunden',
    };
    this.noAvailabless = {
      service: {
        name_en: 'No services found',
        name_fr: 'Aucune services trouvée',
        name_de: 'Keine Dienste gefunden',
      },

      selectAll: {
        name_en: 'Select all',
        name_fr: 'Sélectionner tout',
        name_de: 'Wählen Sie Alle',
      },
      unselectAll: {
        name_en: 'Unselect all',
        name_fr: 'déselectionner tout',
        name_de: 'Alles wiederufen',
      },
      notfound: {
        name_en: 'No terms or word-group found',
        name_fr: 'Aucun terme ou groupe de mots trouvé',
        name_de: 'Keine Begriffe oder Wortgruppe gefunden',
      },
    };
    this.ServicesSelectSettings2 = {
      defaultOpen: true,
      closeDropDownOnSelection: false,
      clearSearchFilter: true,
      singleSelection: false,
      enableCheckAll: true,
      idField: 'id',
      textField: 'languages',
      selectAllText: this.noAvailabless.selectAll[this.serviceLang],
      unSelectAllText: this.noAvailabless.unselectAll[this.serviceLang],
      allowSearchFilter: true,
      searchPlaceholderText: this.textStartWords[this.serviceLang],
      noDataAvailablePlaceholderText:
        this.noAvailabless.notfound[this.serviceLang],
    };

    this.ServicesSelectSettings = {
      clearSearchFilter: true,
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      groupBy: 'city',
      allowSearchFilter: true,
      searchPlaceholderText: this.placeholderFilter[this.serviceLang],
      noDataAvailablePlaceholderText: this.noAvailableData[this.serviceLang],
      enableCheckAll: false,
      closeDropDownOnSelection: true,
      defaultOpen: true,
    };

    /* get company connected and user connected */
    this.getCompanyConnected(this.userObject.rest_id);
    this.getUserConnected(this.userObject.rest_id);
    this.getAllBankAccounts();
    this.getAllCategories();
    this.getAllSubCatg();
    this.getAllServicesBySubCatg();
    this.getAllProduct();
    this.getAllGalleries();
    this.getAllCatgeoriesToSuggest();
    this.getDeviceType();

    this.toolbarOptions = ['Search'];
    this.pageSettings = { pageSizes: true, pageSize: 12 };
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ProfileSettingTitle: any = {
    name_en: 'Profile settings',
    name_fr: 'Paramètres de profil',
    name_de: 'Profileinstellungen',
  };
  /* filter location */
  selectedLocation: any;

  ListLocationSelected: any[] = [];
  selectLocationFilter(event: any) {
    $('body').animate(
      {
        scrollTop: $('body').offset().top,
      },
      2000
    );
    let el = $('#locationListId')[0];
    $('#locationListId')[0] = 2000;
    //window.scrollTo(0, 1000);
    //  document.getElementById('locationListId').scroll(0, 1000);
    //////////////////////console.log(event);
    this.selectedLocation = this.locations.find(
      (element: any) => element.id === event.id
    );
    //////////////console.log(document.getElementById('locationListId').scrollHeight);

    //this.ListLocationSelected.push(event.id);
    //////////////////////console.log(this.ListLocationSelected);
  }

  scrollToTop = () => {
    document.getElementById('locationListId').scroll(0, 0);
  };
  DeselectLocation() {
    this.ListLocationSelected = [];
    this.selectedLocation = null;
  }
  ngAfterViewInit(): void {}

  getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      this.deviceType = 'tablet';
      this.isMobile = true;
      return this.isMobile;
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      this.deviceType = 'mobile';
      this.isMobile = true;
      return this.isMobile;
    }
    this.deviceType = 'desktop';
    this.isMobile = false;
    return this.isMobile;
  }

  clickLocationsTab() {
    window.scroll(0, 0);
  }
  showData(event: any) {
    if ($('#' + event + '').is(':checked')) {
      this.companyService.updateCompany(this.settings).subscribe((data) => {});
    } else {
      this.companyService.updateCompany(this.settings).subscribe((data) => {});
    }
  }
  ListWordsSelected: any[] = [];
  termsWordsList: any = '';
  getSplitedArray(sub: any) {
    let arr: any[] = [];
    arr = $('#termsWordsList' + sub)
      .val()
      .split('\n');
    // // // ////conslog(arr);
    return arr;
  }

  selectTerms(event: any, subId: any) {
    //////console.log(event);
    //////console.log(this.ListWordsSelected);

    /*  const index = this.ListWordsSelected.findIndex((object) => {
      return object.id === event.id;
    });
    if (index < 0) {
      this.ListWordsSelected.push({ id: event.id, languages: event.languages });
    } else {
      this.ListWordsSelected.splice(index, 1);
    }
    //////////////////////console.log(event);
    //////////////////////console.log(this.ListWordsSelected);
    let appendKeywords = '';*/
    /*this.ListWordsSelected.forEach((el) => {
      appendKeywords += event.languages + '\n';
    });*/
    //this.getSplitedArray(subId);
    // ////conslog(this.ListLocationSelected);
    this.addKeywords(subId);
  }
  DeselectTerms(id: any) {
    //// // // ////conslog(this.ListWordsSelected);
    //////console.log(this.ListWordsSelected);
    this.addKeywords(id);
  }
  appendAllKeywords: any;
  listOfNotDefaultKeyWords: any[] = [];
  hidewords(id) {}
  clickToOpen(status: any, id: any) {
    if (status) {
      let app = '';
      this.appendAllKeywords = '';
      let arrayList: any[] = [];
      this.ListWordsSelected = [];
      this.listOfNotDefaultKeyWords = [];
      let obj = this.keywordStandards.find((ee) => ee.id === id);
      //////console.log(this.companyKeywords);
      //////console.log(obj);
      $('#termsWordsList' + id)
        .val()
        .substring(
          0,
          $('#termsWordsList' + id)
            .val()
            .lastIndexOf('\n')
        );
      let arr = $('#termsWordsList' + id)
        .val()
        .split('\n')
        .filter((el) => el !== '');

      this.listOfNotDefaultKeyWords = this.companyKeywords.filter(
        (el) => el.subField === id && el.is_manually === false
      );
      this.nbreKeywords = arr.length;

      //////////////////console.log('list of keywords from list for sub id ==' + id);
      //////////////////console.log(this.listOfNotDefaultKeyWords);
      //////////////////console.log('END list of keywords from list for sub id ==' + id);

      obj.services.forEach((element) => {
        //////////////////////console.log(element);
        this.listOfNotDefaultKeyWords.forEach((ee) => {
          if (
            element.languages === ee.text &&
            ee.is_manually === false &&
            ee.subField === id
          ) {
            arrayList.push({
              id: element.id,
              languages: element.languages,
            });
          }
        });
      });
      this.ListWordsSelected = arrayList;
      //////////////////////console.log(this.ListWordsSelected);
      //////////////////////console.log(this.appendAllKeywords);
    }
  }
  checkfield(val: any): boolean {
    const index = this.ListWordsSelected.findIndex((object) => {
      return object.id === val.id;
    });
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  }
  countKeywords(id) {
    let arr = $('#termsWordsList' + id)
      .val()
      .split('\n')
      .filter((el) => el !== '');
    this.nbreKeywords = arr.length;
  }
  addKeywords(id: any) {
    let arr: any[] = [];
    let objArray: any[] = [];
    let appendKeywords: any[] = [];
    let key: any[] = [];
    //////////////////console.log('list of keywords by default');
    //////////////////console.log(this.allkeywordsCompanies);
    //////////////////console.log('End list of keywords by default');

    let messageExce = {
      name_de: 'Sie können nur 5 Wortgruppen hinzufügen',
      name_en: 'you can only add 5 words-groups',
      name_fr: 'vous ne pouvez ajouter que 5 groupes de mots',
    };
    let emptywords = {
      name_de: 'Sie sollten mindestens ein Wort hinzufügen, um fortzufahren',
      name_en: 'You should add at least one word to continue',
      name_fr: 'Vous devez ajouter au moins un mot pour continuer',
    };
    key = this.companyKeywords.filter(
      (ee) => ee.subField !== id && ee.is_dafault === false
    );
    ////////console.log('keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey');
    ////////console.log(this.companyKeywords);

    ////////console.log('keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey');
    if (key.length > 0) {
      key.forEach((rrrr) => {
        // appendKeywords.push(rrrr.text);
      });
    }
    arr = $('#termsWordsList' + id)
      .val()
      .split('\n');

    if (this.ListWordsSelected.length > 0) {
      this.ListWordsSelected.forEach((el) => {
        appendKeywords.push(el.languages);
      });
    }

    if (arr.length > 5) {
      this.alertMessage(messageExce[this.serviceLang]);
      return false;
    }
    if (
      arr.filter((ll) => ll !== '').length === 0 &&
      appendKeywords.length === 0
    ) {
      this.alertMessage(emptywords[this.serviceLang]);
      return false;
    }
    let rules: any = {
      name_en:
        'Each word or word-group in a new line please and separated by comma',
      name_fr:
        "Chaque mot ou groupe de mots dans une nouvelle ligne s'il vous plaît et séparé par une virgule",
      name_de:
        'Jedes Wort oder jede Wortgruppe bitte in eine neue Zeile und durch Komma getrennt',
    };
    let messageCaracters = {
      name_en: 'Each keyword must contain only 30 caratcers',
      name_fr: 'Chaque mot-clé ne doit contenir que 30 caractères',
      name_de: 'Jedes Schlüsselwort darf nur 30 Zeichen enthalten',
    };
    let successMessage = {
      name_en: 'Keywords were updated successfully.',
      name_fr: 'Les mots clés ont été mis à jour avec succès.',
      name_de: 'Keywords wurden erfolgreich aktualisiert.',
    };
    let primes: any[] = [];
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var regexp = /d/g;
    if (arr.length > 0) {
      if (this.showmessage) {
        return false;
      }
      primes = appendKeywords.concat(arr);
    } else {
      primes = appendKeywords;
    }

    primes
      .filter((l) => l !== '')
      .forEach((el) => {
        ////conslog(el);
        let found = arr.some((elll) => elll === el);
        ////conslog(found);

        objArray.push({
          text: el,
          is_accepted: 1,
          is_deleted: 0,
          is_dafault: false,
          subField: id,
          is_manually: found ? true : false,
        });
      });
    ////////console.log('primes');
    ////////console.log(primes);
    ////////console.log('primes');
    let obj = {
      referenceId: this.companyConnected.id,
      list_words: this.allkeywordsCompanies.concat(key).concat(objArray),
      type: 'company',
    };

    ////////console.log('obj to send');
    ////////console.log(obj);
    ////////console.log('End obj to send');

    this.companyService.createkeywords(obj).subscribe((data) => {
      //////////////////console.log('data from server');
      //////////////////console.log(obj);
      //////console.log('addd');

      //////////////////console.log('End data from server');
      this.getCompanyConnected(this.userObject.rest_id);
      //this.clickToOpen(true, id);
      // this.successMessage(successMessage[this.serviceLang]);
    });
  }
  isNumeric(num: any) {
    return !isNaN(num);
  }

  onSelectAllServices(event: any, id: any) {
    //////////////////console.log(event);
    // this.ServicesSelectSettings2.clos
  }

  showSocialsAccount(event: any) {
    if ($('#' + event + '').is(':checked')) {
      this.companyService
        .updateCompany({ id: this.companyConnected.id, socials: this.socials })
        .subscribe((data) => {});
    } else {
      this.companyService
        .updateCompany({ id: this.companyConnected.id, socials: this.socials })
        .subscribe((data) => {});
    }
  }

  updateCompanyAddress() {
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };
    var autocomplete = new google.maps.places.Autocomplete(
      $('#partner_addresss')[0] as HTMLInputElement,
      {}
    );

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];

          if (addressType == 'route') {
            $('#partner_street').val(val);
            var street = $('#partner_street').val();
          }
          if (addressType == 'street_number') {
            $('#partner_street_nb').val(val);
            var street_nb = $('#partner_street_nb').val();
          }
          if (addressType == 'locality') {
            $('#city_partner').val(val);
            var ort = $('#city_partner').val();
          }
          if (addressType == 'administrative_area_level_1') {
            $('#state_partner').val(val);
            var state = $('#state_partner').val();
          }
          if (addressType == 'country') {
            $('#country_partner').val(val);
            var city = $('#country_partner').val();
          }
          if (addressType == 'postal_code') {
            var code: any;
            if (val == null) {
              code = 0;
            } else {
              $('#zip_code_partner').val(val);
              code = $('#zip_code_partner').val();
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
            $('#latitude_partner').val(latitude_search);
            $('#longitude_partner').val(longitude_search);
            ////////////////////console.log(latitude_search + '====>' + longitude_search);
          }
        }
      );
    });
  }
  multiSelectTab: [] = [];
  listCurrentFieldOfBusiness: [] = [];

  showSocialsEdit() {
    this.showSocials = true;
  }
  privacy: any;
  codePhone1Company: any;
  codePhone2Company: any;
  splitedCompany: any;
  splitedCompanyy: any;
  urlimgusercover: any;
  secondConcatUsername: any;
  /* get company connected */
  getCompanyConnected(id: any) {
    let userObject = {
      user_id: id,
    };
    var obj = {
      user_id: id,
    };
    var locationServices = [];
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      //////console.log(company);

      this.emailSignature = company.email_signature;
      this.urlimguser =
        'https://api.aroundorder.com:1337/api/user/' +
        company.user.id +
        '/' +
        company.id +
        '/logo.png';
      this.urlimgusercover =
        'https://api.aroundorder.com:1337/api/user/' +
        company.user.id +
        '/' +
        company.id +
        '/cover.png';

      this.description = company.description;
      company.category.languages = JSON.parse(company.category.languages)[
        this.serviceLang
      ];
      //////// // // ////conslog(company);
      var newString = company.company_name.replace(/[^A-Z0-9]+/gi, '.');
      this.splitedCompany = newString.toLowerCase();
      this.splitedCompanyy = newString.toLowerCase() + '.';
      var ret = company.company_link.replace(this.splitedCompany + '.', '');

      this.newUsername = ret;
      this.terms = {
        terms: company.terms,
        terms_fr: company.terms_fr,
        terms_de: company.terms_de,
      };

      this.privacy = company.privacy;
      ////// // // ////conslog(company);

      this.addressObject = {
        id: company.id,
        company_name: company.company_name,
        street: company.street,
        street_number: company.street_number,
        city: company.city,
        state: company.state,
        country: company.country,
        zip_code: company.zip_code,
        additive: company.additive,
        appartment_number: company.appartment_number,
        longitude: company.longitude,
        latitude: company.latitude,
      };
      this.contactObject = {
        id: company.id,
        phone1: company.phone1,
        email: company.email,
        phone2: company.phone2,
        fax: company.fax,
        website: company.website,
        code_phone: company.phone2
          ? this.getCurrentCodeCountry(company.phone2)
          : 'de',
        code_mobile: company.phone1
          ? this.getCurrentCodeCountry(company.phone1)
          : 'de',
      };

      // ////////// // // ////conslog(this.contactObject);

      this.settings = {
        id: company.id,
        show_card: company.show_card,
        show_phone: company.show_phone,
        show_email: company.show_email,
        show_website: company.show_website,
      };
      let arrCurrentBusiness: any = [];
      this.socials = JSON.parse(company.socials);
      const locationsList: any = [];
      const multiSelect: any = [];
      this.companyConnected = company;
      this.phonesList = JSON.parse(company.list_phones);
      this.hashtags = JSON.parse(company.hashtags);
      this.getAllLocationNewVersion(company.id);
      this.getAllserviceKey(company.mainCategoryId);
      this.getKeywordsByCompany(company.id);
      this.companyService
        .getAllLocations({ companyId: this.companyConnected.id })
        .subscribe((data) => {
          data.locations.forEach((element) => {
            //////// // // ////conslog(element);

            element['origin'] = {
              lat: company.latitude,
              lng: company.longitude,
            };
            element['destination'] = {
              lat: element.latitude,
              lng: element.longitude,
            };
            element['renderOptions'] = {
              polylineOptions: { strokeColor: '#007ff2' },
            };
            element['list_services'] = JSON.parse(element.services);
            ////// ////////// // // ////conslog(element["list_services"]);
            element['list_services'].forEach((el) => {
              el.service.languages = JSON.parse(el.service.languages);
            });
            multiSelect.push({
              id: element.id,
              name:
                element.zip_code +
                ' ' +
                element.city +
                ' ' +
                element.state +
                ' ' +
                element.country,
            });

            if (JSON.parse(element.services).length > 0) {
              JSON.parse(element.services).forEach((eee) => {
                //if (arrCurrentBusiness.some((l) => l !== eee.service.id)) {
                arrCurrentBusiness.push(eee.service.id);
                // }
              });
              this.listCurrentFieldOfBusiness = arrCurrentBusiness.filter(
                (a, b) => arrCurrentBusiness.indexOf(a) === b
              );
            }
            //////////////console.log(this.listCurrentFieldOfBusiness);

            locationServices.push({
              id: element.id,
              listOfSevices: JSON.parse(element.services),
            });

            locationsList.push(element);
            this.servicesSelected.push({
              id: element.id,
              listOfSevices: JSON.parse(element.services),
            });
          });
          this.locations = locationsList;
          this.multiSelectTab = multiSelect;
          this.locationsServices = locationServices;
        });
      this.getCurrentCategory(company.mainCategoryId);
    });
  }
  hotles: [] = [];

  changeLanguage() {
    var e = $('#langSelect :selected').val();

    this.translate.use(String(e));
    localStorage.removeItem('language');
    localStorage.setItem('language', String(e));
    this.language = localStorage.getItem('language');
  }
  showPrivacyText: boolean = true;
  showTermsUpdate() {
    this.showTermsText = false;
  }

  showTermsDeUpdate() {
    this.showTermsTextDe = false;
  }

  showTermsFrUpdate() {
    this.showTermsTextFr = false;
  }

  showPrivacyUpdate() {
    this.showPrivacyText = false;
  }
  updatePrivacy() {
    this.companyService
      .updateCompany({
        id: this.companyConnected.id,
        privacy: this.privacy,
      })
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.getUserConnected(this.userObject.rest_id);
        this.showPrivacyText = true;
      });
  }

  updateCompanyLink(id: any, link: any) {
    let usernameMsg = {
      name_en: 'Your username can only contain alphanumeric characters',
      name_fr:
        "Votre nom d'utilisateur ne peut contenir que des caractères alphanumériques",
      name_de: 'Ihr Benutzername darf nur alphanumerische Zeichen enthalten',
    };
    let usernameMsgExist = {
      name_en: 'This username is alrady exist',
      name_fr: "Ce nom d'utilisateur existe déjà",
      name_de: 'Dieser Benutzername existiert bereits',
    };
    if (!this.checkAlphNumeric(link)) {
      this.alertMessage(usernameMsg[this.serviceLang]);
      return false;
    }
    this.companyConnected.companyLink = this.splitedCompany + '.' + link;
    this.companyService
      .updateCompany({
        id: id,
        company_link: this.companyConnected.companyLink,
      })
      .subscribe((data) => {
        if (!data.success) {
          if (data.message === 'exist') {
            this.alertMessage(usernameMsgExist[this.serviceLang]);
            return false;
          }
        }
      });
    return true;
  }

  ngSelectValue: any;
  ngSelectValueSub: any;
  ngNotSelectValue: any;
  ngNotSelectValueSub: any;
  subcateg: any;
  subcatega: any[] = [];
  getValueSub(event: any) {
    this.NewSubSuggestionValue = {
      id: event.id,
      name: event.languages[this.serviceLang],
    };
    this.ngNotSelectValueSub = '';
  }
  showSubList: boolean = false;
  sugNewSub(event: any) {
    this.NewSubSuggestionValue = { id: null, name: event };
    this.ngSelectValueSub = {};
  }
  addFieldctg(event: any) {
    this.NewCatgSuggestionValue = { id: null, name: event };
    this.ngSelectValue = {};
    this.showSubList = true;
  }
  selectedCategoryName: any;
  getValue(event: any) {
    ////////// // // ////conslog(event);
    var arrList: any[] = [];
    this.NewCatgSuggestionValue = {
      id: event.id,
      name: event.languages[this.serviceLang],
    };
    //  this.selectedCategoryName = event.languages;
    this.ngNotSelectValue = '';
    this.showSubList = false;
    this.categoriesService
      .get_subcategoriesByCategoryid(parseInt(event.id))
      .subscribe((element: any) => {
        element.forEach((e) => {
          ////// ////////// // // ////conslog(e);

          // e.languages = JSON.parse(e.languages);

          if (e.is_accepted == true && e.is_deleted == false) {
            arrList.push({ id: e.id, languages: JSON.parse(e.languages) });
          }
        });

        this.subcatega = arrList;
        //// ////////// // // ////conslog(this.subcatega);
      });
  }

  updateTerms() {
    this.companyService
      .updateCompany({
        id: this.companyConnected.id,
        terms: this.terms.terms,
      })
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.getUserConnected(this.userObject.rest_id);
        this.showTermsText = true;
      });
  }
  saveSocials() {
    //////////////////console.log(this.socials);
    if (this.socials.fb.link && this.socials.fb.link.includes('https://')) {
      this.socials.fb.link = this.socials.fb.link.split('https://')[1];
    }
    if (this.socials.fb.link && this.socials.fb.link.includes('http://')) {
      this.socials.fb.link = this.socials.fb.link.split('http://')[1];
    }
    if (this.socials.inst.link && this.socials.inst.link.includes('https://')) {
      this.socials.inst.link = this.socials.inst.link.split('https://')[1];
    }
    if (this.socials.inst.link && this.socials.inst.link.includes('http://')) {
      this.socials.inst.link = this.socials.inst.link.split('http://')[1];
    }

    if (this.socials.twt.link && this.socials.twt.link.includes('https://')) {
      this.socials.twt.link = this.socials.twt.link.split('https://')[1];
    }

    if (this.socials.twt.link && this.socials.twt.link.includes('http://')) {
      this.socials.twt.link = this.socials.twt.link.split('http://')[1];
    }
    if (this.socials.lnk.link && this.socials.lnk.link.includes('https://')) {
      this.socials.lnk.link = this.socials.lnk.link.split('https://')[1];
    }
    if (this.socials.lnk.link && this.socials.lnk.link.includes('http://')) {
      this.socials.lnk.link = this.socials.lnk.link.split('http://')[1];
    }

    this.companyService
      .updateCompany({ id: this.companyConnected.id, socials: this.socials })
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.showSocials = false;
      });
  }

  /* get all categories and subCategories and services */
  SuggestCat: any[] = [];
  getAllCategories() {
    var allCategoriesSelected = [];
    var showListCategories = [];
    this.servicesServices.getArchitectureCategories().subscribe((services) => {
      services.forEach((element) => {
        allCategoriesSelected.push({
          id: element.id,
          languages: JSON.parse(element.languages),
        });
        /* element.sub_categories.forEach((sub) => {
          //// ////////// // // ////conslog(sub);

          allCategoriesSelected.push(JSON.parse(sub.languages));
          sub.services.forEach((s) => {
            allCategoriesSelected.push(JSON.parse(s.languages));
          });
        });*/
        //showListCategories.push(element.name);
      });
      this.showListServices = allCategoriesSelected;
      this.suggestCategories = showListCategories;
      //// ////////// // // ////conslog(this.showListServices);
    });
  }

  getAllCatgeoriesToSuggest() {
    var arrAllCtg: any[] = [];
    this.servicesServices.getArchitectureCategories().subscribe((services) => {
      services.forEach((element) => {
        arrAllCtg.push({
          id: element.id,
          languages: JSON.parse(element.languages),
        });
      });
      this.SuggestCat = arrAllCtg;
    });
  }

  finishLoading: boolean = false;
  checkSelectedService(idService: any) {
    let arr: any;

    let localId = $('#locationId').val();
    arr = this.AllNeLocationsServices.find((el) => el.id == parseInt(localId));

    if (arr) {
      //////////console.log(arr);
      let found = arr.services.some(
        (element) => element.service.id === idService
      );
      return found;
    }
    return false;
  }

  showUpdateDescription() {
    this.showDescriptionField = true;
  }
  updateDescription() {
    this.companyService
      .updateCompany({
        id: this.companyConnected.id,
        description: this.description,
      })
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.getUserConnected(this.userObject.rest_id);
        this.showDescriptionField = false;
      });
  }

  showUpdateJobTitle() {
    this.showJobTitleField = false;
  }
  updateJobTitle(value: any) {
    this.companyService
      .updateCompany({ id: this.companyConnected.id, mainCategoryId: value })
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.getUserConnected(this.userObject.rest_id);
        this.showJobTitleField = true;
      });
  }
  /* get all sub categories */
  getAllSubCatg() {
    var subObjects = [];
    this.servicesServices.getAllSubCategories().subscribe((subs: any) => {
      if (subs.data) {
        subs.data.forEach((sub: any) => {
          var sub_languages = JSON.parse(sub.languages);
          subObjects.push({
            id: sub.id,
            sub_name: sub_languages,
            category_id: sub.categoryId,
            lang: this.language,
          });
        });
        this.allSub = subObjects;
      }
    });
  }

  /* get all sub services */
  getAllServicesBySubCatg() {
    var servicesObjects = [];
    this.servicesServices.getAllSubCategories().subscribe((services) => {});
  }

  openFirstLevel(id: any) {
    $('.level1' + id).css('display', '');
  }
  Allsuggestions: any[] = [];
  openModalMapView(template: TemplateRef<any>) {
    this.locations = this.locations;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  searchPanel: any = {
    name_en: 'search',
    name_fr: 'chercher',
    name_de: 'suche',
  };
  NoLocation: any = {
    name_en: 'No locations found',
    name_fr: 'Auccun emplacements trouvé',
    name_de: 'Keine Standorte gefunden',
  };
  NoService: any = {
    name_en: 'No service added',
    name_fr: 'Aucun service ajouté',
    name_de: 'Kein Dienst hinzugefügt',
  };
  columnTab: any = {
    name_de: 'Standort',
    name_en: 'Location',
    name_fr: 'Emplacement',
  };
  openModalEditService(template: TemplateRef<any>, obj: any, locationId: any) {
    var servicesObjects = [];
    setTimeout(() => {
      this.finishLoading = true;
    }, 3000);
    var arrayObject = {};
    ////////////console.log(obj);

    this.servicesServices.getArchitectureCategories().subscribe((e: any) => {
      let a: any[] = e;

      a.forEach((cat: any) => {
        cat.languages = JSON.parse(cat.languages);
        let catobj: any = {
          name: cat.languages[this.serviceLang],
          category_id: cat.id,
          type: 'category',
        };
        this.Allsuggestions.push(catobj);
        let sub: any[] = cat.sub_categories;

        sub.forEach((sub) => {
          sub.languages = JSON.parse(sub.languages);
          let servobj: any = {
            name: sub.languages[this.serviceLang],
            id: sub.id,
            category_id: sub.categoryId,
            type: 'sub_category',
          };
          this.Allsuggestions.push(servobj);
          let ser: any[] = sub.services;
          ser.forEach((ser) => {
            ser.languages = JSON.parse(ser.languages);
            let servobj: any = {
              name: ser.languages[this.serviceLang],
              id: ser.id,
              category_id: sub.categoryId,
              subcategory_id: ser.subCategoryId,
              type: 'service',
            };
            this.Allsuggestions.push(servobj);
          });
        });
      });
      ////////// // // ////conslog(this.Allsuggestions);
    });
    this.servicesServices.getArchitectureCategories().subscribe((services) => {
      if (services) {
        services.forEach((sub: any) => {
          var sub_languages = JSON.parse(sub.languages);
          sub.languages = JSON.parse(sub.languages);
          const found = obj.some((el) => el.id === sub.id);
          if (found) {
            servicesObjects.push({
              id: sub.id,
              services_name: sub_languages,
              sub_category_id: sub.subCategoryId,
              lang: this.language,
              exist: true,
            });
          } else {
            servicesObjects.push({
              id: sub.id,
              services_name: sub_languages,
              sub_category_id: sub.subCategoryId,
              lang: this.language,
              exist: false,
            });
          }
          sub.sub_categories.forEach((subc) => {
            subc.languages = JSON.parse(subc.languages);
            subc.services.forEach((services) => {
              services.languages = JSON.parse(services.languages);
            });
          });
        });
        $('#locationId').val(locationId);
        this.allServices = services;
        this.allservices2 = this.allServices;
        ////////// // // ////conslog(this.allServices);
      }
    });

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });

    // localStorage.setItem('locationId', locationId);
  }
  allservices2: any[] = [];
  getLocationById(id: any) {
    this.companyService.getLocationById({ id: id }).subscribe((data) => {
      this.locationById = data.data;
      this.locationRow = {
        id: data.data.id,
        distance: data.data.distance ? data.data.distance : '',
        city: data.data.city ? data.data.city : '',
        country: data.data.country ? data.data.country : '',
        is_deleted: data.data.is_deleted ? data.data.is_deleted : '',
        is_active: data.data.is_active ? data.data.is_active : '',
        zip_code: data.data.zip_code ? data.data.zip_code : '',
        state: data.data.state,
        addressLocation:
          data.data.zip_code +
          ' | ' +
          data.data.city +
          ' | ' +
          data.data.state +
          ' | ' +
          data.data.country,
      };
    });
  }

  openModalEditLocation(id: any, template: TemplateRef<any>) {
    localStorage.setItem('locationId', id);
    this.getLocationById(id);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  locationSuggestedId: any;

  openModalSuggest(template: TemplateRef<any>, id: any) {
    this.locationSuggestedId = id ? id : null;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    ////////// // // ////conslog(this.locationSuggestedId);
  }
  searchUpdateAddress(add: any) {
    var autocomplete = new google.maps.places.Autocomplete(
      $('#addressUpdate')[0] as HTMLInputElement,
      {}
    );

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
      $('#addressUpdate')[0] as HTMLInputElement,
      {}
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      ////////////////console.log(place.address_components);

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];

        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];
          ////////// ////////// // // ////conslog(val);

          if (addressType == 'locality') {
            $('#city_update').val(val);
            var ort = $('#city_update').val();
          }
          if (addressType == 'postal_code') {
            $('#zip_update').val(val);
            var code = $('#zip_update').val();
          }

          if (addressType == 'administrative_area_level_1') {
            $('#state_update').val(val);
            var state = $('#state_update').val();
          }
          if (addressType == 'country') {
            $('#country_update').val(val);
            var city = $('#country_update').val();
          }
        }
      }
    });
  }

  geocodeLocUpdate(request: google.maps.GeocoderRequest): void {
    let map: google.maps.Map;
    let marker: google.maps.Marker;
    // let geocoder: google.maps.Geocoder;
    let responseDiv: HTMLDivElement;
    let response: HTMLPreElement;
    this.geocoder
      .geocode({ address: request })
      .then((result) => {
        const { results } = result;

        // map.setCenter(results[0].geometry.location);
        // marker.setPosition(results[0].geometry.location);
        // marker.setMap(map);
        //responseDiv.style.display = 'block';
        let loc = JSON.stringify(result.results[0], null, 2);
        ////////////////console.log(JSON.parse(loc));
        ////////////console.log(loc);
        $('#lng_update').val(JSON.parse(loc).geometry.location.lng);
        $('#ltd_update').val(JSON.parse(loc).geometry.location.lat);
        ////////////console.log(JSON.parse(loc).geometry.location.lat);
        for (var i = 0; i < JSON.parse(loc).address_components.length; i++) {
          const addressType = JSON.parse(loc).address_components[i].types[0];
          ////////////////console.log(addressType);

          if (addressType) {
            const val = JSON.parse(loc).address_components[i].long_name;

            if (addressType == 'locality') {
              $('#city_update').val(val);
              var ort = $('#city_update').val();
            }
            if (addressType == 'postal_code') {
              $('#zip_update').val(val);
              var code = $('#zip_update').val();
            }

            if (addressType == 'administrative_area_level_1') {
              $('#state_update').val(val);
              var state = $('#state_update').val();
            }
            if (addressType == 'country') {
              $('#country_update').val(val);
              var city = $('#country_update').val();
            }
          }
        }
        var city = $('#city_update').val();
        var zip = $('#zip_update').val();
        var state = $('#state_update').val();
        var country = $('#country_update').val();
        var distance = $('#distance_update').val();
        var long = $('#lng_update').val();
        var lat = $('#ltd_update').val();
        // // ////////// // // ////conslog(long + ' ' + lat);

        if (!city || !country || !state) {
          this.locationMessage = {
            name_en: 'Please fill the required fields.',
            name_de: 'Bitte füllen Sie die Pflichtfelder aus.',
            name_fr: 'Veuillez remplir les champs requis.',
          };
          Swal.fire({
            icon: 'warning',
            text: this.locationMessage[this.serviceLang],
          });
          return false;
        } /*else if (!long || !lat) {
      let errorMessLgLn = {
        name_en:
          'We cannot locate your address coordinates. Please add a valid address',
        name_fr:
          "Nous ne pouvons pas localiser vos coordonnées d'adresse.Veuillez ajouter une adresse valide",
        name_de:
          'Wir können Ihre Adresskoordinaten nicht finden. Bitte fügen Sie eine gültige Adresse hinzu',
      };
      this.alertMessage(errorMessLgLn[this.serviceLang]);
      return false;
    }*/
        let obj = {
          distance: distance, //this.distance,
          companyId: this.companyConnected.id,
          title: '',
          city: city, //this.cityLocation,
          zip_code: zip, //this.zipCodeLocation,
          state: state, //this.stateLocation,
          country: country, //this.countryLocation,
          longitude: parseFloat(long), //this.longitudeLocation,
          latitude: parseFloat(lat), //this.latitudeLocation,
          is_active: 1,
          id: parseInt(localStorage.getItem('locationId')),
        };
        //////////console.log(obj);
        this.companyService.updateLocation(obj).subscribe((data) => {
          this.getCompanyConnected(this.userObject.rest_id);
        });
        this.closeModalEditLocation();
        //response.innerText = JSON.stringify(result, null, 2);
        return true;
      })
      .catch((e) => {
        //////////////console.log(e);
        return false;
      });
  }
  searchAddress: any = {
    name_en: 'search for address',
    name_fr: "recherche d'adresse",
    name_de: 'adresse suchen',
  };
  address: any = {
    name_en: 'Address',
    name_fr: 'Adresse',
    name_de: 'Adresse',
  };
  updateLocationDetails() {
    this.geocodeLocUpdate($('#addressUpdate').val());
  }
  selectValue(event: any) {}
  activeLocation(event: any) {
    if ($(event).is(':checked')) {
      this.companyService
        .updateLocation({ id: event.value, is_active: 1 })
        .subscribe((location) => {
          this.getLocationById(event.value);
          $('#activeLocation' + event.value).css('display', 'inline');
          $('#deactiveLocation' + event.value).css('display', 'none');
        });
    } else {
      this.companyService
        .updateLocation({ id: event.value, is_active: 0 })
        .subscribe((location) => {
          this.getLocationById(event.value);
          $('#activeLocation' + event.value).css('display', 'none');
          $('#deactiveLocation' + event.value).css('display', 'inline');
        });
    }
  }
  addServiceToLoction() {
    let id = $('#locationId').val();
    var array: any[] = [];
    $('.chk-fields-business:checked').each(function () {
      array.push(parseInt(this.value));
    });

    let locationObj = {
      id: parseInt(id),
      services: array,
      still_do: 1,
    };
    //// // // ////conslog(this.ListLocationSelected);

    this.companyService
      .updateLocationServices(locationObj)
      .subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.modalRef.hide();
        //this.ngOnInit();;
      });
  }
  filtervalue: any;
  selectService(idService: any, idSub: any) {
    var id = localStorage.getItem('locationId');
    var items = document.getElementsByClassName('chk-services' + idSub);
    var serviceItems = items.length;
    if ($('#chk-services' + idService).is(':checked')) {
      let found = this.servicesToUpdate.some(
        (el) => el === parseInt($('#chk-services' + idService).val())
      );
      if (!found)
        this.servicesToUpdate.push(
          parseInt($('#chk-services' + idService).val())
        );
    } else {
      var indexOf = this.servicesToUpdate.indexOf(
        parseInt($('#chk-services' + idService).val())
      );
      this.servicesToUpdate.splice(indexOf, 1);
    }
    var inputElements = [].slice.call(
      document.querySelectorAll('.chk-services' + idSub)
    );
    var checkedValue = inputElements.filter((chk) => chk.checked).length;
    if (checkedValue === serviceItems) {
      $('#serviceSelected' + idSub).prop('checked', true);
    } else {
      $('#serviceSelected' + idSub).prop('checked', false);
    }
  }
  listOfServiceTitle: any = {
    name_en: 'List of services you have added to this location',
    name_fr: 'Liste des services que vous avez ajoutés à cet emplacement',
    name_de: 'Liste der Dienste, die Sie diesem Standort hinzugefügt haben',
  };
  closeModalEditLocation() {
    this.modalRef.hide();
    localStorage.removeItem('locationId');
  }

  closeModalAddServiceToLocation() {
    this.modalRef.hide();
    //localStorage.removeItem('locationId');
  }

  openListSub(obj: any, id: any) {
    //$(".list_sub" + id).css("display", "");
    if ($('.list_sub' + id).is(':visible')) {
      $('.list_sub' + id).css('display', 'none');
    } else {
      $('.list_sub' + id).css('display', '');
    }
    obj.forEach((element) => {
      if (id !== element.id) {
        $('.list_sub' + element.id).css('display', 'none');
      }
    });
  }

  openListServices(obj: any, id: any) {
    if ($('.list_services' + id).is(':visible')) {
      $('.list_services' + id).css('display', 'none');
    } else {
      $('.list_services' + id).css('display', '');
    }
    obj.forEach((element) => {
      if (id !== element.id) {
        $('.list_services' + element.id).css('display', 'none');
      }
    });
  }

  allSubCategoriesAreChecked(subId: any) {
    let array: any[] = [];
    var items = document.getElementsByClassName('businessSelected' + subId);
    $('.businessSelected' + subId + ':checked').each(function () {
      array.push(1);
    });
    if (items.length === array.length) return true;
    else return false;
  }

  listOfSubSelected: any[] = [];

  SelectAllServices(event: any) {
    ////// // // ////conslog(event);

    var array: any[] = this.servicesToUpdate;
    if ($('#serviceSelected' + event).is(':checked')) {
      $('.businessSelected' + event).prop('checked', true);
      if ($('.businessSelected' + event).prop('checked', true)) {
        $('.businessSelected' + event + ':checked').each(function () {
          let found = array.some((el) => el === parseInt(this.value));
          if (!found) array.push(parseInt(this.value));
        });
      }
    } else {
      $('.businessSelected' + event).prop('checked', false);
      $('.businessSelected' + event + ':not(:checked)').each(function () {
        var indexOf = array.indexOf(parseInt(this.value));
        array.splice(indexOf, 1);
      });
    }
    var id = localStorage.getItem('locationId');
    var items = document.getElementsByClassName('businessSelected' + event);
    var inputElements = [].slice.call(
      document.querySelectorAll('.businessSelected' + event)
    );
    var checkedValue = inputElements.filter((chk) => chk.checked);
    this.servicesToUpdate = array;
    ////// // // ////conslog(this.servicesToUpdate);
  }

  selectBusinessOfFiled(event: any, catg: any) {
    let array: any[] = [];
    if ($('#businessSelected' + event).is(':checked')) {
      ////// // // ////conslog('checked');

      let found = this.servicesToUpdate.some((el) => el === parseInt(event));
      if (!found) this.servicesToUpdate.push(parseInt(event));
    } else {
      ////// // // ////conslog('unchecked');
      var indexOf = this.servicesToUpdate.indexOf(parseInt(event));
      this.servicesToUpdate.splice(indexOf, 1);
    }
    ////// // // ////conslog(this.servicesToUpdate.length);
    ////// // // ////conslog(this.subsList.length);
    $('.businessSelected' + catg + ':checked').each(function () {
      array.push(1);
    });

    if (array.length === this.subsList.length) {
      $('#serviceSelected' + event).prop('checked', true);
    } else {
      $('#serviceSelected' + event).prop('checked', false);
    }
  }

  clickedMarker(label: string, index: number) {}

  mapClicked($event: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  compareArrays(arr: any, serviceId: any) {
    return true;
  }

  locationMessage: any;
  messageLang: any;
  loc: any;

  addLocation() {
    this.messageLang = 'message_' + this.currentLanguage;
    this.geocode($('#new_address').val());
  }
  newLocation: any = {
    city: '',
    state: '',
    country: '',
  };
  geocoder: any = new google.maps.Geocoder();
  geocode(request: google.maps.GeocoderRequest): void {
    let map: google.maps.Map;
    let marker: google.maps.Marker;
    // let geocoder: google.maps.Geocoder;
    let responseDiv: HTMLDivElement;
    let response: HTMLPreElement;
    this.geocoder
      .geocode({ address: request })
      .then((result) => {
        const { results } = result;

        // map.setCenter(results[0].geometry.location);
        // marker.setPosition(results[0].geometry.location);
        // marker.setMap(map);
        //responseDiv.style.display = 'block';
        let loc = JSON.stringify(result.results[0], null, 2);
        ////////////////console.log(JSON.parse(loc));
        ////////////console.log(loc);
        $('#new_lng').val(JSON.parse(loc).geometry.location.lng);
        $('#new_ltd').val(JSON.parse(loc).geometry.location.lat);
        ////////////console.log(JSON.parse(loc).geometry.location.lat);
        for (var i = 0; i < JSON.parse(loc).address_components.length; i++) {
          const addressType = JSON.parse(loc).address_components[i].types[0];
          ////////////////console.log(addressType);

          if (addressType) {
            const val = JSON.parse(loc).address_components[i].long_name;

            if (addressType == 'locality') {
              $('#new_city').val(val);
              var ort = $('#new_city').val();
            }
            if (addressType == 'postal_code') {
              $('#new_zip').val(val);
              var code = $('#new_zip').val();
            }

            if (addressType == 'administrative_area_level_1') {
              $('#new_state').val(val);
              var state = $('#new_state').val();
            }
            if (addressType == 'country') {
              $('#new_country').val(val);
              var city = $('#new_country').val();
            }
          }
        }
        var city = $('#new_city').val();
        var zip = $('#new_zip').val();
        var state = $('#new_state').val();
        var country = $('#new_country').val();
        var distance = $('#new_distance').val();
        var long = $('#new_lng').val();
        var lat = $('#new_ltd').val();
        // // ////////// // // ////conslog(long + ' ' + lat);

        if (!city || !country || !state) {
          this.locationMessage = {
            message_en: 'Please fill the required fields.',
            message_de: 'Bitte füllen Sie die Pflichtfelder aus.',
            message_fr: 'Veuillez remplir les champs requis.',
          };
          Swal.fire({
            icon: 'warning',
            text: this.locationMessage[this.messageLang],
          });
          return false;
        } /*else if (!long || !lat) {
      let errorMessLgLn = {
        name_en:
          'We cannot locate your address coordinates. Please add a valid address',
        name_fr:
          "Nous ne pouvons pas localiser vos coordonnées d'adresse.Veuillez ajouter une adresse valide",
        name_de:
          'Wir können Ihre Adresskoordinaten nicht finden. Bitte fügen Sie eine gültige Adresse hinzu',
      };
      this.alertMessage(errorMessLgLn[this.serviceLang]);
      return false;
    }*/
        let obj = {
          distance: distance, //this.distance,
          companyId: this.companyConnected.id,
          title: '',
          city: city, //this.cityLocation,
          zip_code: zip, //this.zipCodeLocation,
          state: state, //this.stateLocation,
          country: country, //this.countryLocation,
          longitude: parseFloat(long), //this.longitudeLocation,
          latitude: parseFloat(lat), //this.latitudeLocation,
          is_active: 1,
          services: [],
        };
        ////////////console.log(obj);
        this.companyService.addLocation(obj).subscribe((data) => {
          //////////////console.log(data);

          this.getCompanyConnected(this.userObject.rest_id);
        });
        this.clsoeAddLocation();
        //response.innerText = JSON.stringify(result, null, 2);
        return true;
      })
      .catch((e) => {
        //////////////console.log(e);
        return false;
      });
  }
  clsoeAddLocation() {
    this.modalRef.hide();
    setTimeout(() => {
      $('#new_city').val('');
      $('#new_address').val('');
      $('#new_zip').val('');
      $('#new_lng').val('');
      $('#new_ltd').val('');
      $('.showInfo').css('display', 'none');
    }, 2000);
  }
  deleteLocation: any = {
    name_en: 'Delete location',
    name_fr: "Supprimer l'emplacement",
    name_de: 'Standort löschen',
  };
  markerDragEnd(m: any, $event: MouseEvent) {}

  /* get company connected */
  url: any;
  getUserConnected(id: any) {
    var obj = {
      id: id,
    };
    this.companyService.getUserById(obj).subscribe((user) => {
      this.userConnected = user.message;
      //  this.url = this.userConnected.username;
      //  this.url = this.url.replace(this.companyConnected.company_name, '');

      this.personalInfo = {
        id: this.userConnected.id,
        // username: this.userConnected.username,
        phone: this.userConnected.phone,
        mobile: this.userConnected.mobile,
        code_phone: this.userConnected.phone
          ? this.getCurrentCodeCountry(this.userConnected.phone)
          : 'de',
        code_mobile: this.userConnected.mobile
          ? this.getCurrentCodeCountry(this.userConnected.mobile)
          : 'de',
        first_name: this.userConnected.first_name,
        last_name: this.userConnected.last_name,
        personal_email: this.userConnected.personal_email,
      };
    });
  }

  getAllBankAccounts() {
    let objectUser = {
      userId: this.userObject.rest_id,
    };
    this.bankAccount.getAllBankAccount(objectUser).subscribe((data) => {
      this.listBanks = data;
    });
  }

  /* ========================================================================== */
  /* ACCOUNT INFORMATIONS SECTION */
  /* ========================================================================== */
  newUsername: any;
  changeAccountInformations() {
    var fname = $('#fnameuser').val();
    let messageErrorFs = {
      name_en: 'First name field is required',
      name_fr: 'Le champ prénom est obligatoire',
      name_de: 'Das Feld Vorname ist erforderlich',
    };
    let messageErrorLs = {
      name_en: 'Last name field is required',
      name_fr: 'Le champ nom est obligatoire',
      name_de: 'Das Feld Nachname ist erforderlich',
    };
    let messageErrorEm2 = {
      name_en:
        'The word (Tanduu ) is not allowed to be used in any personal information',
      name_fr:
        "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
      name_de:
        'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
    };
    if (!fname) {
      messageErrorFs[this.serviceLang];
      this.alertMessage(messageErrorFs[this.serviceLang]);
      return false;
    }
    if (!this.personalInfo.last_name) {
      messageErrorLs[this.serviceLang];
      this.alertMessage(messageErrorLs[this.serviceLang]);
      return false;
    }
    if (
      fname.includes('tandu') ||
      this.personalInfo.last_name.includes('tandu')
    ) {
      this.alertMessage(messageErrorEm2[this.serviceLang]);
      return false;
    }

    // this.updateCompanyLink(this.companyConnected.id, this.newUsername);
    if (this.updateCompanyLink(this.companyConnected.id, this.newUsername)) {
      this.personalInfo.first_name = fname;
      this.companyService.updateUser(this.personalInfo).subscribe((data) => {
        this.getCompanyConnected(this.userObject.rest_id);
        this.getUserConnected(this.userObject.rest_id);
        this.accountSuccess = true;
        this.showPersonalInfoEdit = false;
      });
    }
    // this.personalInfo.username = this.splitedCompany + '.' + this.newUsername;
  }
  public mapReadyHandler(
    map: google.maps.Map,
    template: TemplateRef<any>
  ): void {
    map.addListener('click', (e: google.maps.MouseEvent) => {
      //  this.zone.run(() => {
      let arr: any;
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        let latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        let that = this;
        geocoder.geocode({ location: latlng }, function (results) {
          if (results[0]) {
            ////////// ////////// // // ////conslog(results);
            var fullAdrress = results[0].address_components;
            var lengthAddress: number = results[0].address_components.length;
            that.zoom = 11;
            if (results[0].address_components.length > 0) {
              var zip_code = !/\D/.test(
                fullAdrress[lengthAddress - 1].long_name
              )
                ? fullAdrress[lengthAddress - 1].long_name
                : '';
              var country = fullAdrress[lengthAddress - 2].long_name
                ? fullAdrress[lengthAddress - 2].long_name
                : '';
              var state = fullAdrress[lengthAddress - 3].long_name
                ? fullAdrress[lengthAddress - 3].long_name
                : '';
              var city = fullAdrress[lengthAddress - 3].long_name
                ? fullAdrress[lengthAddress - 4].long_name
                : '';
              /*localStorage.setItem(
                'checkLocation',
                JSON.stringify({
                  zipCodeLocation: zip_code,
                  countryLocation: country,
                  cityLocation: city,
                  stateLocation: state,
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                }
              );*/
            }
          }
        });
      });
      this.modalRef = this.modalService.show(template, {
        class: 'modal-dialog modal-dialog-lg',
        backdrop: 'static',
        keyboard: false,
      });
      /* setTimeout(() => {
         this.fullFillLocationField();
       }, 2000);*/
    });
  }

  fullFillLocationField() {
    var checkLocation = JSON.parse(localStorage.getItem('checkLocation'));
    this.zipCodeLocation = checkLocation.zipCodeLocation;
    this.cityLocation = checkLocation.cityLocation;
    this.stateLocation = checkLocation.stateLocation;
    (this.countryLocation = checkLocation.countryLocation),
      (this.latitudeLocation = checkLocation.lat);
    this.longitudeLocation = checkLocation.lng;
    this.loadingFormsLocation = true;
  }

  closeMoadlddLocation() {
    localStorage.removeItem('checkLocation');
    this.zipCodeLocation = '';
    this.cityLocation = '';
    this.stateLocation = '';
    this.countryLocation = '';
    this.latitudeLocation = '';
    this.longitudeLocation = '';
    this.loadingFormsLocation = false;
    this.modalRef.hide();
  }

  getGeoLocation(lat: number, lng: number) {
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      let latlng = { lat: lat, lng: lng };
      let that = this;
      geocoder.geocode({ location: latlng }, function (results) {
        if (results[0]) {
          that.zoom = 11;
          return results[0];
        }
      });
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('locationId');
    localStorage.removeItem('productId');
    localStorage.removeItem('bankId');
    localStorage.removeItem('checkLocation');
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }
  /* submit security */
  onsubmitSecurity(f: any) {
    if (f.controls.confirm_password.value !== f.controls.new_password.value) {
      this.newConfirmFailed = true;
      this.securityFailed = true;
      this.oldPasswordFailed = false;

      return false;
    }
    let obj = {
      old_password: f.controls.old_password.value,
      new_password: f.controls.new_password.value,
      id: this.userObject.rest_id,
    };

    this.companyService.updateUserSecurity(obj).subscribe((data) => {
      var message = data.message;
      if (!data.reset) {
        this.newConfirmFailed = false;
        this.securityFailed = true;
        this.oldPasswordFailed = true;
        return false;
      }
      this.newConfirmFailed = false;
      this.securityFailed = false;
      this.oldPasswordFailed = false;
      this.securitySuccess = true;
      this.getCompanyConnected(this.userObject.rest_id);
      this.getUserConnected(this.userObject.rest_id);
      $('#old_password').val('');
      $('#new_password').val('');
      $('#confirm_password').val('');
    });
  }

  /* ========================================================================== */
  /* COMPANY INFORMATIONS SECTION */
  /* ========================================================================== */

  updateCompany() {
    let arrNewList: any = [];
    if (
      this.companyConnected.company_name !== this.addressObject.company_name
    ) {
      this.allKeywordsToVerfiy.forEach((ee) => {
        if (ee.text.includes(this.companyConnected.company_name)) {
          ee.text = ee.text.replace(
            String(this.companyConnected.company_name),
            String(this.addressObject.company_name)
          );
        }
      });
      this.companyConnected.company_link = (
        this.addressObject.company_name.replace(' ', '.') +
        '.' +
        this.companyConnected.company_link.split('.')[
          this.companyConnected.company_link.split('.').length - 1
        ]
      ).toLowerCase();
      let obj2 = {
        referenceId: this.companyConnected.id,
        list_words: this.allKeywordsToVerfiy,
        type: 'company',
      };
      //////////////console.log(obj2);

      this.companyService.createkeywords(obj2).subscribe((data) => {
        //////////////////console.log('data from server');
        //////////////////console.log(obj);
        //////////////////console.log('End data from server');
        this.getKeywordsByCompany(this.companyConnected.id);
        //this.clickToOpen(true, id);
        //  this.successMessage(successMessage[this.serviceLang]);
      });
    }
    let obj = {
      additive: $('#partner_additional').val()
        ? $('#partner_additional').val()
        : '',
      appartment_number: $('#partner_appartment').val()
        ? $('#partner_appartment').val()
        : '',
      city: $('#city_partner').val(),
      company_name: this.addressObject.company_name,
      country: $('#country_partner').val() ? $('#country_partner').val() : '',
      id: this.addressObject.id,
      latitude: $('#latitude_partner').val(),
      longitude: $('#longitude_partner').val(),
      state: $('#state_partner').val(),
      street: $('#partner_street').val(),
      street_number: $('#partner_street_nb').val()
        ? $('#partner_street_nb').val()
        : '',
      zip_code: $('#zip_code_partner').val(),
      company_link: this.companyConnected.company_link,
    };
    if (!obj.longitude || !obj.latitude) {
      let errorMessLgLn = {
        name_en:
          'We cannot locate your address coordinates. Please add a valid address',
        name_fr:
          "Nous ne pouvons pas localiser vos coordonnées d'adresse.Veuillez ajouter une adresse valide",
        name_de:
          'Wir können Ihre Adresskoordinaten nicht finden. Bitte fügen Sie eine gültige Adresse hinzu',
      };
      this.alertMessage(errorMessLgLn[this.serviceLang]);
      return false;
    }

    if (!obj.longitude || !obj.latitude) {
      let errorMessLgLn = {
        name_en:
          'We cannot locate your address coordinates. Please add a valid address',
        name_fr:
          "Nous ne pouvons pas localiser vos coordonnées d'adresse.Veuillez ajouter une adresse valide",
        name_de:
          'Wir können Ihre Adresskoordinaten nicht finden. Bitte fügen Sie eine gültige Adresse hinzu',
      };
      this.alertMessage(errorMessLgLn[this.serviceLang]);
      return false;
    } else if (!obj.city || !obj.street || !obj.state || !obj.zip_code) {
      let errorMesscity = {
        name_en: 'Street, city, and postal code  are required fields',
        name_fr:
          'La rue, la ville et le code postal sont des champs obligatoires',
        name_de: 'Straße, Ort und Postleitzahl sind Pflichtfelder',
      };
      this.alertMessage(errorMesscity[this.serviceLang]);
      return false;
    }

    this.companyService.updateCompany(obj).subscribe((data) => {
      this.getCompanyConnected(this.userObject.rest_id);
      this.getUserConnected(this.userObject.rest_id);
      this.showUpdateCompany = false;
    });
  }

  updateCompanyContact() {
    let messageErrorPhoneEmpty = {
      name_en: 'Phone field is required',
      name_fr: 'Le champ Téléphone est obligatoire',
      name_de: 'Telefonfeld ist erforderlich',
    };
    let messageErrorPhoneLenght = {
      name_en: 'You must enter a valid phone number',
      name_fr: 'Vous devez entrer un numéro de téléphone valide',
      name_de: 'Sie müssen eine gültige Telefonnummer eingeben',
    };

    let messageErrorPhoneCode = {
      name_en: 'You must select country code',
      name_fr: 'Vous devez sélectionner le code du pays',
      name_de: 'Sie müssen den Ländercode auswählen',
    };
    let messageErrorEm = {
      name_en: 'You must add a valid email',
      name_fr: 'Vous devez ajouter un email valide',
      name_de: 'Sie müssen eine gültige E-Mail-Adresse hinzufügen',
    };
    let messageErrorEm2 = {
      name_en:
        'The word (Tanduu ) is not allowed to be used in any personal information',
      name_fr:
        "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
      name_de:
        'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
    };
    let messageErrorEm3 = {
      name_en: 'Add at least one number',
      name_fr: 'Ajouter au moins un numéro',
      name_de: 'Füge mindestens eine Zahl hinzu',
    };
    let mailpart1 = this.contactObject.email
      ? this.contactObject.email.split('@')
      : '';
    if (!this.contactObject.phone1 && !this.contactObject.phone2) {
      this.alertMessage(messageErrorEm3[this.serviceLang]);
      return false;
    }
    if (this.contactObject.phone1) {
      if (!this.getMobileCode(this.contactObject.phone1).includes('+')) {
        this.alertMessage(messageErrorPhoneCode[this.serviceLang]);
        return false;
      }
    }
    if (this.contactObject.phone2) {
      if (!this.getMobileCode(this.contactObject.phone2).includes('+')) {
        this.alertMessage(messageErrorPhoneCode[this.serviceLang]);
        return false;
      }
    }
    if (
      (this.contactObject.phone1 &&
        this.contactObject.phone1.length <=
          this.countCodeCountry(this.contactObject.phone1)) ||
      (this.contactObject.phone1 && this.contactObject.phone1.length < 9)
    ) {
      this.alertMessage(messageErrorPhoneLenght[this.serviceLang]);
      return false;
    }

    if (!this.contactObject.email) {
      this.contactObject.email = '';
    }
    if (mailpart1 && mailpart1[0].includes('tandu')) {
      this.alertMessage(messageErrorEm2[this.serviceLang]);
      return false;
    }
    if (
      this.contactObject.email &&
      !this.contactObject.email.match(this.regexEmail)
    ) {
      this.alertMessage(messageErrorEm[this.serviceLang]);
      return false;
    }
    if (this.contactObject.phone2 && this.contactObject.phone2.length > 9) {
      this.contactObject.phone2 = this.contactObject.phone2;
    }
    if (!this.contactObject.phone2) {
      this.contactObject.phone2 = '';
    }
    if (!this.contactObject.phone1) {
      this.contactObject.phone1 = '';
    }

    if (
      this.contactObject.website &&
      this.contactObject.website.includes('https://')
    ) {
      this.contactObject.website =
        this.contactObject.website.split('https://')[1];
    }
    if (
      this.contactObject.website &&
      this.contactObject.website.includes('http://')
    ) {
      this.contactObject.website =
        this.contactObject.website.split('http://')[1];
    }
    //////////////////console.log(this.contactObject);

    this.companyService.updateCompany(this.contactObject).subscribe((data) => {
      this.getCompanyConnected(this.userObject.rest_id);
      this.getUserConnected(this.userObject.rest_id);
      this.showCompanyDetailsUpdate = false;
    });
  }

  personalDetailsText: any = {
    name_en:
      'Your personal contact details will not be published! They are only used for internal communication.',
    name_de:
      'Ihre persönlichen Kontakt Details werden nicht veröffentlicht! Sie dienen nur der internen Kommunikation.',
    name_fr:
      'Vos coordonnées personnelles ne seront pas publiées ! Ils ne sont utilisés que pour la communication interne.',
  };

  addNewPhoneNumber() {
    let newPhone = {};
    let arrPhones = this.phonesList;
    const found = this.phonesList.some((el) => el.phone == this.newPhoneNumber);
    if (found) {
      this.newPhoneFound = true;
    } else {
      newPhone['id'] = arrPhones.length + 1;
      newPhone['phone'] = this.newPhoneNumber;
      newPhone['label'] = this.descriptionPhone;
      newPhone['is_deleted'] = 0;
      arrPhones.push(newPhone);
      this.companyConnected.phones_list = arrPhones;

      this.companyService
        .updateCompany(this.companyConnected)
        .subscribe((data) => {
          this.getCompanyConnected(this.userObject.rest_id);
          this.getUserConnected(this.userObject.rest_id);
        });
    }
  }

  editPhoneModal(index: any) {
    $('.class-row-phone' + index).css('display', 'none');
    $('.class-row-phone-save' + index).css('display', 'inline');
  }

  saveEdit(index: any, id: any) {
    let arrPhones = this.phonesList;
    const found = this.phonesList.some((el) => el.phone == this.newPhoneNumber);
    var phone: any = $('#phoneNumber' + index).val();
    var label: any = $('#labelPhone' + index).val();
    if (found) {
      this.phoneFound = true;
    } else {
      var objIndex = arrPhones.findIndex((obj) => obj.id == id);
      arrPhones[objIndex].phone = phone;
      arrPhones[objIndex].label = label;
      this.companyConnected.phones_list = arrPhones;
      this.companyService
        .updateCompany(this.companyConnected)
        .subscribe((data) => {
          this.getCompanyConnected(this.userObject.rest_id);
          this.getUserConnected(this.userObject.rest_id);
        });
    }
  }

  updatePersonalData() {
    //// // ////////// // // ////conslog(event.target.value.split(" ")[0]);
    // this.getCountryCode(event.target.value.split(" ")[0])
    let messageErrorPhoneEmpty = {
      name_en: 'Phone field is required',
      name_fr: 'Le champ Téléphone est obligatoire',
      name_de: 'Telefonfeld ist erforderlich',
    };
    let messageErrorPhoneLenght = {
      name_en: 'You must enter a valid phone number',
      name_fr: 'Vous devez entrer un numéro de téléphone valide',
      name_de: 'Sie müssen eine gültige Telefonnummer eingeben',
    };

    let messageErrorPhoneCode = {
      name_en: 'You must select country code',
      name_fr: 'Vous devez sélectionner le code du pays',
      name_de: 'Sie müssen den Ländercode auswählen',
    };
    let messageErrorEm = {
      name_en: 'You must add a valid email',
      name_fr: 'Vous devez ajouter un email valide',
      name_de: 'Sie müssen eine gültige E-Mail-Adresse hinzufügen',
    };
    let messageErrorEm2 = {
      name_en:
        'The word (Tanduu ) is not allowed to be used in any personal information',
      name_fr:
        "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
      name_de:
        'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
    };
    let messageErrorEm3 = {
      name_en: 'Add at least one number',
      name_fr: 'Ajouter au moins un numéro',
      name_de: 'Füge mindestens eine Zahl hinzu',
    };
    let mailpart1 = this.personalInfo.personal_email
      ? this.personalInfo.personal_email.split('@')
      : '';
    if (!this.personalInfo.phone && !this.personalInfo.mobile) {
      this.alertMessage(messageErrorEm3[this.serviceLang]);
      return false;
    }
    /*  if (this.personalInfo.phone) {
      if (!this.getMobileCode(this.personalInfo.phone).includes('+')) {
        this.alertMessage(messageErrorPhoneCode[this.serviceLang]);
        return false;
      }
    }
    if (this.personalInfo.mobile) {
      if (!this.getMobileCode(this.personalInfo.mobile).includes('+')) {
        this.alertMessage(messageErrorPhoneCode[this.serviceLang]);
        return false;
      }
    }*/
    if (
      (this.personalInfo.phone &&
        this.personalInfo.phone.length <=
          this.countCodeCountry(this.personalInfo.phone)) ||
      (this.personalInfo.phone && this.personalInfo.phone.length < 9)
    ) {
      this.alertMessage(messageErrorPhoneLenght[this.serviceLang]);
      return false;
    }

    if (!this.personalInfo.personal_email) {
      this.personalInfo.personal_email = '';
    }
    if (mailpart1 && mailpart1[0].includes('tandu')) {
      this.alertMessage(messageErrorEm2[this.serviceLang]);
      return false;
    }
    if (
      this.personalInfo.personal_email &&
      !this.personalInfo.personal_email.match(this.regexEmail)
    ) {
      this.alertMessage(messageErrorEm[this.serviceLang]);
      return false;
    }
    if (this.personalInfo.mobile && this.personalInfo.mobile.length > 9) {
      this.personalInfo.mobile = this.personalInfo.mobile;
    }
    if (!this.personalInfo.mobile) {
      this.personalInfo.mobile = '';
    }
    if (!this.personalInfo.phone) {
      this.personalInfo.phone = '';
    }

    /*  if (this.personalInfo.phone) {
      this.personalInfo.username = this.personalInfo.phone
        ? this.personalInfo.phone
        : '';
    }*/
    this.companyService.updateUser(this.personalInfo).subscribe((data) => {
      //////////////////console.log(data);

      this.getCompanyConnected(this.userObject.rest_id);
      this.getUserConnected(this.userObject.rest_id);
      this.showPersonalUpdate = false;
    });
  }

  openModalBankAccount(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  textDeleteBank: any;
  openModalDeleteBank(template: TemplateRef<any>, obj: any) {
    this.bankNameDeleted = obj.bank_name;
    this.textDeleteBank = {
      name_en: 'Are you sure to delete ' + this.bankNameDeleted + ' Bank ?',
      name_fr:
        'Êtes-vous sûr de vouloir supprimer le compte bancaire ' +
        this.bankNameDeleted,
      name_de:
        'Möchten Sie den ' + this.bankNameDeleted + '-Konto wirklich löschen?',
    };
    localStorage.setItem('bankId', obj.id);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  textDeleteLocation: any;
  locationName: any;
  openModalDeleteLocation(template: TemplateRef<any>, obj: any) {
    this.locationName = obj.zip
      ? obj.zip
      : '' + ' ' + obj.city
      ? obj.city
      : '' + ' ' + obj.state
      ? obj.state
      : '';
    this.textDeleteLocation = {
      name_en: 'Are you sure to delete this location?',
      name_fr: 'Voulez-vous vraiment supprimer cet emplacement ?',

      name_de: 'Möchten Sie diesen Standort wirklich löschen?',
    };

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#locationToDelete').val(obj.id);
  }

  confirmDeleleteLocation() {
    let locationRowUpdate = {
      id: parseInt($('#locationToDelete').val()),
      is_deleted: 1,
    };
    this.companyService.updateLocation(locationRowUpdate).subscribe((data) => {
      this.getCompanyConnected(this.userObject.rest_id);
      this.closeModalDeleteLocation();
      this.ListLocationSelected = [];
      this.selectedLocation = '';
      //this.ngOnInit();;
    });
  }

  closeModalDeleteLocation() {
    $('#locationToDelete').val('');
    this.modalRef.hide();
  }

  openModalEditBank(template: TemplateRef<any>, obj: any) {
    this.bankNameEdited = obj.bank_name;
    this.bankName = obj.bank_name;
    this.accountOwner = obj.account_owner;
    this.iban = obj.iban;
    this.rib = obj.rib;
    this.swiftBic = obj.swift_bic;
    localStorage.setItem('bankId', obj.id);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeDeleteBank() {
    localStorage.removeItem('bankId');
    this.modalRef.hide();
  }

  confirmEditBank() {
    let bank = {
      id: localStorage.getItem('bankId'),
      bank_name: this.bankName,
      account_owner: this.accountOwner,
      iban: this.iban,
      rib: this.rib,
      swift_bic: this.swiftBic,
    };
    this.bankAccount.updateBankAccount(bank).subscribe((data) => {
      this.getAllBankAccounts();
      this.closeDeleteBank();
    });
  }

  confirmDeletionBank() {
    var id = localStorage.getItem('bankId');
    this.bankAccount
      .updateBankAccount({ id: parseInt(id), is_deleted: 1 })
      .subscribe((data) => {
        this.getAllBankAccounts();
        this.closeDeleteBank();
      });
  }

  addNewBankAccount() {
    let bank = {
      bank_name: this.bankName,
      account_owner: this.accountOwner,
      iban: this.iban,
      rib: this.rib,
      is_deleted: 0,
      swift_bic: this.swiftBic,
      userId: this.userObject.rest_id,
    };
    this.bankAccount.addNewBankAccount(bank).subscribe((data) => {
      this.getAllBankAccounts();
      this.modalRef.hide();
    });
  }

  showMessage() {}
  created(): void {
    document
      .getElementById(this.grid.element.id + '_searchbar')
      .addEventListener('keyup', () => {
        this.grid.search((event.target as HTMLInputElement).value);
      });
  }
  mapGridClick() {
    this.mapGrid = true;
    this.mapList = false;
    document.getElementById('list-view').classList.remove('active');
    document.getElementById('grid-view').classList.add('active');
    $('#grid-map').css('display', 'inline');
    $('#grid-view').css('color', 'white');
    $('#list-view').css('color', 'black');
  }
  mapListClick() {
    this.mapGrid = false;
    this.mapList = true;
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    $('#grid-map').css('display', 'none');
    $('#grid-view').css('color', 'black');
    $('#list-view').css('color', 'white');
  }
  setInfo(marker) {
    var content =
      '<div class="profile-widget" style="width: 100%; display: inline-block;">' +
      '<div class="doc-img">' +
      '<a [routerLink]="patients/doctor-profile' +
      '" tabindex="0" target="_blank">' +
      '<img class="img-fluid" alt="' +
      marker.doc_name +
      '" src="' +
      marker.image +
      '">' +
      '</a>' +
      '</div>' +
      '<div class="pro-content">' +
      '<h3 class="title">' +
      '<a [routerLink]="patients/doctor-profile' +
      '" tabindex="0">' +
      marker.doc_name +
      '</a>' +
      '<i class="fas fa-check-circle verified"></i>' +
      '</h3>' +
      '<p class="speciality">' +
      marker.speciality +
      '</p>' +
      '<div class="rating">' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star filled"></i>' +
      '<i class="fas fa-star"></i>' +
      '<span class="d-inline-block average-rating"> (' +
      marker.total_review +
      ')</span>' +
      '</div>' +
      '<ul class="available-info">' +
      '<li><i class="fas fa-map-marker-alt"></i> ' +
      marker.address +
      ' </li>' +
      '<li><i class="far fa-clock"></i> ' +
      marker.next_available +
      '</li>' +
      '<li><i class="far fa-money-bill-alt"></i> ' +
      marker.amount +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</div>';
    this.infowindow.setContent(content);
  }

  initilize() {
    window.location.reload();
    window.stop();
    this.bounds = new google.maps.LatLngBounds();
    const mapOptions = {
      zoom: 14,
      center: { lat: 53.470692, lng: -2.220328 },
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
    this.map.slide = true;

    this.setMarkers(this.map, this.locations);
    this.infowindow = new google.maps.InfoWindow({
      content: 'loading...',
    });
    // google.maps.event.addListener(this.infowindow, 'closeclick', function () {
    //   this.infowindow.close();
    // });
    // this.slider = window.setTimeout(this.show, 2000);
  }
  setMarkers(map, locations) {
    for (var i = 0; i < locations.length; i++) {
      let item = locations[i];
      let latlng = new google.maps.LatLng(item.lat, item.lng);
      let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: 'assets/img/marker.png',
      });
      this.bounds.extend(latlng);
      google.maps.event.addListener(marker, 'click', () => {
        this.setInfo(item);
        this.infowindow.open(map, marker);
      });
    }
    map.fitBounds(this.bounds);
    google.maps.event.addListener(map, 'zoom_changed', function () {
      if (map.zoom > 16) map.slide = false;
    });
  }

  mapListclick() {
    this.Router.navigate(['/map-list']);
  }

  openEditSection() {
    $('#edit_account_details').css('display', 'inline');
    $('#account-details').css('display', 'none');
  }

  closeEditAccountSection() {
    $('#edit_account_details').css('display', 'none');
    $('#account-details').css('display', 'inline');
    this.securitySuccess = false;
    this.securityFailed = false;
    this.newConfirmFailed = false;
    this.oldPasswordFailed = false;
  }
  openCompanyEditSection() {
    this.showUpdateCompany = true;
  }

  closeCompanyEditSection() {
    this.showUpdateCompany = false;
  }

  openPersonalEditSection() {
    this.showPersonalUpdate = true;
  }
  closeCompanyEditContactSection() {
    this.showCompanyDetailsUpdate = false;
  }

  closePersonalEditSection() {
    this.showPersonalUpdate = false;
  }

  openCompanyEditDetails() {
    this.showCompanyDetailsUpdate = true;
  }

  closeCompanyEditDetails() {
    this.showCompanyDetailsUpdate = false;
  }
  updateHastags() {
    var arr = this.itemss;
    var htg = [];
    var output = [...this.hashtags, ...this.itemss];
    arr.forEach((element) => {
      this.hashtags.push(element);
    });
    // this.hashtags = arr
    let objHs = {
      id: this.companyConnected.id,
      hashtags: this.hashtags,
    };
    this.companyService.updateCompany(objHs).subscribe((data) => {
      this.itemss = [];
    });
  }

  deleteHashtags(value: any) {
    var objIndex = this.hashtags.findIndex((obj) => obj.value == value);
    this.hashtags.splice(objIndex, 1);
    if (this.hashtags.length < 1) {
      let objHs = {
        id: this.companyConnected.id,
        hashtags: [],
      };
      this.companyService.updateCompany(objHs).subscribe((data) => {});
    } else {
      let objHs = {
        id: this.companyConnected.id,
        hashtags: this.hashtags,
      };
      this.companyService.updateCompany(objHs).subscribe((data) => {});
    }
  }

  /* update Account information */
  itemss: any[];
  onAdding(tag: TagModel): Observable<TagModel> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<TagModel> {
    const confirm = window.confirm(
      'Do you really want to remove this tag?' + tag.name
    );
    return of(tag).pipe(filter(() => confirm));
  }
  onTagsChanged(input: any) {
    // alert('dddd');
  }

  addSignature() {
    this.companyConnected.email_signature = this.emailSignature;
    this.companyService
      .updateCompany({
        id: this.companyConnected.id,
        email_signature: this.emailSignature,
      })
      .subscribe((data) => {
        this.showEmailSignature = true;
      });
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: '500px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',

    toolbarPosition: 'top',
    // toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };


  showMailEdit() {
    this.showEmailSignature = false;
  }
  urlimguser: any;
  msgrpofile = '';
  fileToUploaduser: File;
  selectFileuser(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msgrpofile = 'You must select an image';
      return;
    }
    this.fileToUploaduser = event.target.files[0];
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msgrpofile = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msgrpofile = '';
      this.urlimguser = reader.result;
    };
    const formData = new FormData();
    var fichier: File;
    fichier = event.target.files[0];
    var ext = fichier.name.split('.').pop();
    const testName =
      'user' +
      this.userObject.rest_id +
      '-company' +
      this.companyConnected.id +
      '-logo.png';
    //////// // // ////conslog(testName.split('-'));

    formData.append(
      'file',
      event.target.files[0],
      'user' +
        this.userObject.rest_id +
        '-company' +
        this.companyConnected.id +
        '-logo.png'
    );
    this.companyService
      .uploadUserProfilepic(formData)
      .subscribe((element: any) => {
        this.companyService
          .updateCompany({ id: this.companyConnected.id, logo_updated: true })
          .subscribe((data) => {
            this.getCompanyConnected(this.userObject.rest_id);
          });
      });
  }
  fileToUploadCover: File;

  selectCover(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msgrpofile = 'You must select an image';
      return;
    }
    this.fileToUploadCover = event.target.files[0];
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msgrpofile = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msgrpofile = '';
      this.urlimgusercover = reader.result;
    };
    const formData = new FormData();
    var fichier: File;
    fichier = event.target.files[0];

    formData.append(
      'file',
      event.target.files[0],
      'user' +
        this.userObject.rest_id +
        '-company' +
        this.companyConnected.id +
        '-cover.png'
    );
    this.companyService
      .uploadUserProfilepic(formData)
      .subscribe((element: any) => {
        //////// // // ////conslog(element);
      });
  }

  /* Suggestion of new services */
  NewSuggestCategoryField: any = false;
  NewSuggestSubCategoryField: any = false;
  NewSuggestServiceField: any = false;
  NewSubSuggestionValue: any;
  NewCatgSuggestionValue: any;
  ExistedCatgSuggestionValue: any;
  NewServiceSuggestionValue: any;
  categoryError: any = false;
  subCategoryError: any = false;
  serviceError: any = false;
  successService: any = false;

  openFieldNewCategory() {
    this.suggestNew = true;
    this.NewCatgSuggestionValue = '';
    this.categoryError = false;
  }
  openFieldCategory() {
    this.suggestNew = false;
    this.NewCatgSuggestionValue = '';
    this.categoryError = false;
    ////// ////////// // // ////conslog(this.suggestNew);
  }

  GoToNextLevel() {
    if (!this.NewCatgSuggestionValue) {
      this.categoryError = true;
      return;
    }
    this.level1 = false;
    this.level2 = true;
    this.level3 = false;
    this.categoryError = false;
  }
  GoToNextLevel1() {
    if (!this.NewSubSuggestionValue) {
      this.subCategoryError = true;
      return;
    }
    this.level1 = false;
    this.level2 = false;
    this.level3 = true;
    this.subCategoryError = false;
  }
  allServicesNew: any[] = [];
  subsList: any[] = [];
  requestedmsg: any = {
    name_en:
      'We have received your suggestion. it will take a moment to confirm it, while you wait, you can update your profile for better visibility',
    name_de:
      'Wir haben Ihren Vorschlag erhalten. Die Bestätigung dauert einen Moment. Während Sie warten, können Sie Ihre Profil für eine bessere Sichtbarkeit aktualisieren',
    name_fr:
      'Nous avons bien reçu votre suggestion. il faudra un moment pour le confirmer, en attendant, vous pouvez mettre à jour votre profil pour une meilleure visibilité',
  };

  getCurrentCategory(id: any) {
    let arr: any[] = [];
    this.categoriesService
      .get_subcategoriesByCategoryid(id)
      .subscribe((data) => {
        data.forEach((el) => {
          el.languages = JSON.parse(el.languages);
          arr.push(el);
        });
        this.subsList = arr;
        ////// // // ////conslog(this.subsList);
      });
  }
  GoToLastLevel() {
    // alert('button is clicked');
    var ctgType: boolean;
    var subCtgType: boolean;

    this.serviceError = false;
    if (typeof this.NewCatgSuggestionValue === 'number') {
      ctgType = false;
    } else {
      ctgType = true;
    }
    if (typeof this.NewSubSuggestionValue === 'number') {
      subCtgType = false;
    } else {
      subCtgType = true;
    }

    // append new services
    /*   this.allServicesNew.push({
      id: null,
      name: this.NewServiceSuggestionValue,
    });*/
    let obj: any = {
      is_accepted: false,
      is_deleted: false,
      suggestions: {
        category: this.NewCatgSuggestionValue,
        sub: this.NewSubSuggestionValue,
        //services: this.allServicesNew,
      },
      requesterId: this.companyConnected.id,
      locationId: this.locationSuggestedId,
    };

    //// // // ////conslog(obj);

    this.categservies.suggestcategory(obj).subscribe((e) => {
      this.level1 = true;
      this.level2 = false;
      this.level3 = false;
      this.successService = true;
      this.NewSubSuggestionValue = '';
      this.NewCatgSuggestionValue = '';
      this.NewServiceSuggestionValue = '';
      this.ngSelectValue = '';
      this.ngSelectValueSub = '';
      this.ngNotSelectValue = '';
      this.ngNotSelectValueSub = '';
      this.allServicesNew = [];
      this.listNewServices = [];
      $('#scroll-top').animate({ scrollTop: $(window).scrollTop(0) }, 500);
    });
  }
  GoToNextLevel2() {
    this.level1 = false;
    this.level2 = true;
    this.level3 = false;
  }

  backToFirstLevel() {
    this.level1 = true;
    this.level2 = false;
    this.level3 = false;
  }

  /* SHOP AND GALERIE */
  /* get all products and galeries */
  getAllProduct() {
    /* this.shopService
      .getAllPorduct({ userId: this.userObject.rest_id })
      .subscribe((data) => {
        var arrayProducts: any = [];
        var arrayGalerie: any = [];
        var allProducts: any = [];
        if (JSON.parse(data.products.products).length > 0) {
          JSON.parse(data.products.products).forEach((element) => {
            allProducts.push(element);
            if (!element.is_deleted && element.is_shop) {
              arrayProducts.push(element);
            } else if (!element.is_deleted && !element.is_shop) {
              arrayGalerie.push(element);
            } else {
            }
          });
          this.listShopProducts = arrayProducts;
          this.listGalerie = arrayGalerie;
          this.allProducts = allProducts;
        }
      });*/
  }
  GalleriesList: any[] = [];
  getAllGalleries() {
    /* var arrGalleries: any[] = [];
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
      });*/
  }
  textDeleteProd: any;
  /* delete product */
  openDeletionProduct(template: TemplateRef<any>, item: any) {
    this.ProductName = item.name;
    this.textDeleteProd = {
      name_en: 'Are you sure to delete ' + this.ProductName + ' product ?',
      name_fr:
        'Êtes-vous sûr de vouloir supprimer le produit ' + this.ProductName,
      name_de:
        'Möchten Sie den ' + this.ProductName + '-produkt wirklich löschen?',
    };
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#deleteProductId').val(item.id);
  }
  closeDeleteProduct() {
    localStorage.removeItem('productId');
    this.modalRef.hide();
  }
  closeEditProduct() {
    localStorage.removeItem('productId');
    this.modalRef.hide();
    setTimeout(() => {
      this.ProductName = '';
      this.productPrice = '';
      this.productArticles = '';
      this.productLink = '';
      this.urlPicture = '';
      $('#picture_product').val(null);
    }, 2000);
  }
  confirmProduct() {
    //"id": parseInt(localStorage.getItem("productId"))
    var arrayProduct = this.listShopProducts;
    var objIndex = arrayProduct.findIndex(
      (obj) => obj.id == parseInt($('#deleteProductId').val())
    );
    //Update object's name property.
    arrayProduct[objIndex].is_deleted = 1;
    let productId: any = {
      userId: this.userObject.rest_id,
      products: arrayProduct,
    };
    this.shopService.updateProduct(productId).subscribe((data) => {
      this.getAllProduct();
    });
    this.closeDeleteProduct();
  }

  /* select picture */
  urlPicture: any; //Angular 11, for stricter type
  urlPictures: any[] = [];
  msg = '';
  fileToUpload: File;
  filesToUpload: File;
  catalogName: any;
  catalogLink: any;
  filesMsg: any;
  selectedFiles: any[] = [];
  isVideo: boolean;
  isImage: boolean;

  selectFile(event: any) {
    ////////// // // ////conslog(event.target.files[0]);

    var fileSize = event.target.files[0].size;
    var mimeType = event.target.files[0].type;
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image (PNG, JPEG, JPG, GIF)';
      return;
    } else {
      if (!mimeType.match(/image\/*/)) {
        this.msg = 'Only images are supported';
        return;
      }
      if (fileSize < 5000000) {
        this.msg = ' max-size  allowed to upload is 5M';
        return;
      } else {
        this.fileToUpload = event.target.files[0];
      }
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.urlPicture = reader.result;
    };
  }

  selectFiles(event: any) {
    var arrayFiles: any[] = [];
    var i = 0;
    if (!event.target.files || event.target.files.length == 0) {
      this.filesMsg = 'You must select an image (PNG, JPEG, JPG, GIF)';
      return;
    }
    this.filesToUpload = event.target.files;

    for (i; i < event.target.files.length; i++) {
      //
      var element = event.target.files[i];
      var mimeType = element.type;
      var fileSize = element.size;
      if (
        mimeType.match(/image\/*/) == null &&
        mimeType.match(/video\/*/) == null
      ) {
        this.filesMsg = 'Only images and videos are supported';
        return;
      } else {
        if (fileSize > 5000000) {
          this.filesMsg = ' max-size  allowed to upload is 5M';
          return;
        } else {
          this.selectedFiles.push(event.target.files[i]);
        }
      }
      var reader = new FileReader();
      reader.readAsDataURL(element);
      arrayFiles.push(reader);
    }

    reader.onload = (_event) => {
      var pathFiles: any[] = [];
      arrayFiles.forEach((el) => {
        pathFiles.push(el.result);
      });
      this.filesMsg = '';
      this.urlPictures = pathFiles;
    };
  }

  removePicture(pic: any, arr: any[]) {
    var arrayFilesToRemove: any[] = [];
    arrayFilesToRemove = this.urlPictures;

    var found = arrayFilesToRemove.indexOf(pic);
    this.selectedFiles.splice(found, 1);
    this.urlPictures.splice(found, 1);
    if (this.urlPictures.length < 1) {
      $('#files').replaceWith($('#files').val('').clone(true));
    }
  }

  selectOnlySingleCover(checkbox: any) {
    $('.chk-gallery').each((item) => {
      if (item !== checkbox) item.checked = false;
    });
  }

  /* function confirm upload images for gallery */

  filesCatalog: File[] = [];
  videosCatalogs: File[] = [];
  PicsCatalogs: File[] = [];
  msgCatalogFile: any;

  onSelectCatatlogFile(event: any) {
    this.filesCatalog.push(...event.addedFiles);
    this.PicsCatalogs = [];
    this.videosCatalogs = [];
    this.filesCatalog.forEach((element) => {
      if (element.size > 5000000) {
        element['ToUpload'] = false;
        this.msgCatalogFile = {
          name_en:
            'Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
          name_fr:
            "La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
          name_de:
            'Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
        };
      } else {
        element['ToUpload'] = true;
      }
      this.filterFilesType(element);
    });
  }

  checkIsVideo(file: File) {
    if (file.type.split('/')[0] == 'video') {
      return true;
    }
    return false;
  }

  filterFilesType(file: File) {
    if (file.type.split('/')[0] == 'image') {
      this.PicsCatalogs.push(file);
    } else {
      this.videosCatalogs.push(file);
    }
  }

  RemoveFilesType(file: File) {
    if (file.type.split('/')[0] == 'image') {
      this.PicsCatalogs.splice(this.PicsCatalogs.indexOf(file), 1);
    } else {
      this.videosCatalogs.splice(this.videosCatalogs.indexOf(file), 1);
    }
  }

  onRemoveCatalogFile(event: any) {
    this.filesCatalog.splice(this.filesCatalog.indexOf(event), 1);
    this.RemoveFilesType(event);
    this.msgCatalogFile = {};
    //////// // // ////conslog('vfile');
    //////// // // ////conslog(this.videosCatalogs);
    //////// // // ////conslog('picsfiles');
    //////// // // ////conslog(this.PicsCatalogs);
    //////// // // ////conslog('all files');
    //////// // // ////conslog(this.filesCatalog);
  }

  addNewGallery() {
    //this.isLoading = true;
    const formData = new FormData();
    var arrFilesToPush: any[] = [];
    const some = this.filesCatalog.some((el) => el['ToUpload'] == false);
    if (some) {
      this.msgCatalogFile = {
        name_en:
          'Upload failed!! Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
        name_fr:
          "Le téléchargement a échoué!! La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
        name_de:
          'Upload fehlgeschlagen!! Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
      };
      return false;
    }

    for (let i = 0; i < this.filesCatalog.length; i++) {
      formData.append(
        'files',
        this.filesCatalog[i],
        'user' +
          this.userObject.rest_id +
          '-catalog_' +
          Date.now() +
          i +
          '.' +
          this.filesCatalog[i].name.split('.').pop()
      );
      arrFilesToPush.push({
        id: i + 1,
        file_name:
          'catalog_' +
          Date.now() +
          i +
          '.' +
          this.filesCatalog[i].name.split('.').pop(),
        is_deleted: 0,
        is_primary: 1,
        type: this.filesCatalog[i].type.split('/')[0],
      });
    }
    let objGal = {
      catalog_name: this.catalogName,
      catalog_link: this.catalogLink,
      userId: this.userObject.rest_id,
      is_deleted: 0,
      galleries: arrFilesToPush,
    };

    this.shopService
      .uploadMultipleAttachment(formData)
      .subscribe((data1) => {});
    this.shopService.createGallery(objGal).subscribe((data) => {
      this.filesCatalog = [];
      this.PicsCatalogs = [];
      this.videosCatalogs = [];
      this.urlPictures = [];
      this.msgCatalogFile = {};
      this.getAllGalleries();
      setTimeout(() => {
        //this.isLoading = false;
      }, 2000);
    });
  }

  /* show Modal add galleries */
  urlPictureGallery: any;
  filesMsgs: any;
  idCatalog: any;
  idPicture: any;
  selectedGallery: any;
  selectedPicture: any;
  fileToUpdate: File;
  showModalAddGallery(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  openModalNewCatalog(template: TemplateRef<any>, item: any) {
    this.catalogName = item.catalog_name;
    this.idCatalog = item.id;
    this.selectedGallery = item;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  addNewGalleryToCatalog() {
    const some = this.filesCatalog.some((el) => el['ToUpload'] == false);
    if (some) {
      this.msgCatalogFile = {
        name_en:
          'Upload failed!! Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
        name_fr:
          "Le téléchargement a échoué!! La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
        name_de:
          'Upload fehlgeschlagen!! Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
      };
      return false;
    }
    if (this.filesCatalog.length == 0) {
      this.msgCatalogFile = {
        name_en: 'Upload failed!! Please select one picture / video at least.',
        name_fr:
          'Le téléchargement a échoué!! Veuillez sélectionner au moins une photo/vidéo.',
        name_de:
          'Upload fehlgeschlagen!! Bitte wählen Sie mindestens ein Bild / Video aus',
      };
      return false;
    }
    //this.isLoading = true;

    const formData = new FormData();
    var arrFilesToPush: any[] = [];

    for (let i = 0; i < this.filesCatalog.length; i++) {
      formData.append(
        'files',
        this.filesCatalog[i],
        'user' +
          this.userObject.rest_id +
          '-catalog_' +
          Date.now() +
          i +
          '.' +
          this.filesCatalog[i].name.split('.').pop()
      );
      this.selectedGallery.galleries.push({
        id: i + 1,
        file_name:
          'catalog_' +
          Date.now() +
          i +
          '.' +
          this.filesCatalog[i].name.split('.').pop(),
        is_deleted: 0,
        is_primary: 1,
        type: this.filesCatalog[i].type.split('/')[0],
      });
    }
    let objGal = {
      id: this.idCatalog,
      galleries: this.selectedGallery.galleries,
    };

    this.shopService
      .uploadMultipleAttachment(formData)
      .subscribe((data1) => {});
    this.shopService.updateGallery(objGal).subscribe((data) => {
      this.filesCatalog = [];
      this.PicsCatalogs = [];
      this.videosCatalogs = [];
      this.urlPictures = [];
      this.msgCatalogFile = {};
      this.getAllGalleries();
      setTimeout(() => {
        //this.isLoading = false;
      }, 2000);
    });
    this.closeEditGallery();
  }

  openEditGallery(template: TemplateRef<any>, item1: any, item: any) {
    this.catalogLink = item.catalog_link;
    this.catalogName = item.catalog_name;
    this.idCatalog = item.id;
    this.idPicture = item1.id;
    this.selectedGallery = item;
    this.selectedPicture = item1;
    this.urlPictureGallery =
      'https://api.aroundorder.com:1337/api/user/gallery/' +
      this.userObject.rest_id +
      '/' +
      item1.file_name;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#catalogPicId').val(item1.id);
    $('#catalogId').val(item.id);
  }
  selectFromGallery(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image (PNG, JPEG, JPG, GIF)';
      return;
    }
    this.fileToUpdate = event.target.files[0];
    var mimeType = event.target.files[0].type;
    var fileSize = event.target.files[0].size;

    if (
      mimeType.match(/image\/*/) == null &&
      mimeType.match(/video\/*/) == null
    ) {
      this.filesMsgs = 'Only images and videos are supported';
      return;
    }
    /* if (fileSize > 5000000) {
       this.filesMsgs = 'You have upload file with max-size 5M';
       return;
     }*/
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.filesMsgs = '';
      this.urlPictureGallery = reader.result;
    };
  }
  isLoading: boolean = false;

  confirmEditGallery() {
    //////// // // ////conslog(this.idCatalog);
    //////// // // ////conslog(this.idPicture);
    //this.isLoading = true;

    var ob = this.selectedGallery.galleries.find(
      (el) => el.id === parseInt(this.idPicture)
    );
    if (this.filesCatalog[0]) {
      //////// // // ////conslog(this.filesCatalog[0]);

      if (!this.filesCatalog[0]['ToUpload']) {
        this.msgCatalogFile = {
          name_en:
            'Upload failed!! Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
          name_fr:
            "Le téléchargement a échoué!! La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
          name_de:
            'Upload fehlgeschlagen!! Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
        };
        return false;
      }
      //////// // // ////conslog(this.checkIsVideo(this.filesCatalog[0]));

      ob.file_name =
        'catalog_' +
        Date.now() +
        '.' +
        this.filesCatalog[0].name.split('.').pop();
      ob.type = this.checkIsVideo(this.filesCatalog[0]) ? 'video' : 'image';

      const formData = new FormData();
      formData.append(
        'files',
        this.filesCatalog[0],
        'user' +
          this.userObject.rest_id +
          '-' +
          'catalog_' +
          Date.now() +
          '.' +
          this.filesCatalog[0].name.split('.').pop()
      );

      this.shopService.uploadMultipleAttachment(formData).subscribe((data1) => {
        //////// // // ////conslog(data1);
      });
    }
    let obj = {
      id: parseInt(this.idCatalog),
      catalog_name: this.catalogName,
      catalog_link: this.catalogLink,
      galleries: this.selectedGallery.galleries,
    };
    this.shopService.updateGallery(obj).subscribe((data) => {
      this.filesCatalog = [];
      this.PicsCatalogs = [];
      this.videosCatalogs = [];
      this.urlPictures = [];
      this.msgCatalogFile = {};
      this.getAllGalleries();
      setTimeout(() => {
        //this.isLoading = false;
      }, 2000);
    });
    this.closeEditGallery();
  }
  textDeleteCatalog: any;
  openModalDeleteAllCatalog(template: TemplateRef<any>, item: any) {
    this.selectedGallery = item;

    this.catalogName = item.catalog_name;
    this.textDeleteCatalog = {
      name_en: 'Are you sure to delete ' + this.catalogName + ' catalog ?',
      name_fr:
        'Êtes-vous sûr de vouloir supprimer le catalogue ' + this.catalogName,
      name_de:
        'Möchten Sie den ' + this.catalogName + '-Katalog wirklich löschen?',
    };
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#idDeleteAllCatlog').val(item.id);
  }

  textDeleteCatalogPic: any;
  openDeletionPictureFromCatlog(
    template: TemplateRef<any>,
    item: any,
    item1: any
  ) {
    this.selectedGallery = item;
    this.selectedPicture = item1;
    this.catalogName = item.catalog_name;
    this.textDeleteCatalogPic = {
      name_en:
        'Are you sure to delete this picture from ' +
        this.catalogName +
        ' catalog ?',
      name_fr:
        'Êtes-vous sûr de vouloir supprimer cette image du catalogue ' +
        this.catalogName,
      name_de:
        'Möchten Sie dieses Bild wirklich aus dem ' +
        this.catalogName +
        '-Katalog löschen?',
    };
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#deletePictureCatalog').val(item.id);
  }
  confirmDeletePictureFromCatalog() {
    //this.isLoading = true;
    //////// // // ////conslog(this.selectedGallery);
    var obj = this.selectedGallery.galleries.findIndex(
      (el) => el.id === parseInt(this.selectedPicture.id)
    );
    this.selectedGallery.galleries.splice(obj, 1);

    this.shopService
      .updateGallery({
        id: this.selectedGallery.id,
        galleries: this.selectedGallery.galleries,
      })
      .subscribe((data) => {
        this.getAllGalleries();
        setTimeout(() => {
          //this.isLoading = false;
        }, 2000);
      });
    this.closeEditGallery();
  }
  confirmDeleteAllCategory() {
    //this.isLoading = true;
    let obj = {
      id: parseInt($('#idDeleteAllCatlog').val()),
      is_deleted: 1,
    };

    this.shopService.updateGallery(obj).subscribe((data) => {
      //////// // // ////conslog(data);
      this.getAllGalleries();

      setTimeout(() => {
        //this.isLoading = false;
      }, 2000);
    });
    this.closeEditGallery();
  }
  closeEditGallery() {
    this.modalRef.hide();
    setTimeout(() => {
      this.catalogName = '';
      this.catalogLink = '';
      this.idCatalog = '';
      this.idCatalog = '';
      this.idPicture = '';
      this.urlPictureGallery = '';
      this.selectedGallery = '';
      this.selectedPicture = '';
      this.urlPictures = [];
      this.filesCatalog = [];
      this.PicsCatalogs = [];
      this.videosCatalogs = [];
      this.urlPictures = [];
      this.msgCatalogFile = {};
      $('#catalogPicId').val('');
      $('#catalogId').val('');
    }, 2000);
    $('#files').replaceWith($('#files').val('').clone(true));
    $('#file').replaceWith($('#file').val('').clone(true));
  }
  /* END GALLERY */

  /* PRODUCT API */
  filesProducts: File[] = [];
  msgProductFile: any;

  onSelectProductFile(event: any) {
    ////////// // // ////conslog(event);
    this.filesProducts = [];
    this.filesProducts.push(...event.addedFiles);
    if (this.filesProducts[0].size > 5000000) {
      this.filesProducts[0]['ToUpload'] = false;
      this.msgProductFile = {
        name_en:
          'Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
        name_fr:
          "La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
        name_de:
          'Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
      };
    } else {
      this.filesProducts[0]['ToUpload'] = true;
    }
    ////////// // // ////conslog(this.filesProducts[0]);
  }

  onRemoveProductFile(event: any) {
    ////////// // // ////conslog(event);
    this.filesProducts.splice(this.filesProducts.indexOf(event), 1);
    this.msgProductFile = {};
  }

  addNewProduct() {
    var arrayProduct = this.allProducts;
    /*var parts = this.productPicture.split('\\');
    var picture_name = parts[parts.length - 1];*/

    const formData = new FormData();
    formData.append(
      'file',
      this.filesProducts[0],
      'user' +
        this.userObject.rest_id +
        '-' +
        'product' +
        arrayProduct.length +
        1 +
        '.png'
    );
    if (this.filesProducts[0]['ToUpload'] == false) {
      this.msgProductFile = {
        name_en:
          'Upload failed!! Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
        name_fr:
          "Le téléchargement a échoué!! La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
        name_de:
          'Upload fehlgeschlagen!! Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
      };
      return false;
    }
    this.shopService.uploadAttachment(formData).subscribe((data1) => {
      var product: any = {
        id: arrayProduct.length + 1,
        name: this.productName,
        price: this.productPrice,
        is_shop: 1,
        picture_name: 'product' + arrayProduct.length + 1 + '.png',
        is_deleted: 0,
        product_link: this.productLink,
        articles: this.productArticles,
      };
      arrayProduct.push(product);
      this.shopService
        .updateProduct({
          userId: this.userObject.rest_id,
          products: arrayProduct,
        })
        .subscribe((data) => {
          this.getAllProduct();
          this.closeEditProduct();
          this.filesProducts = [];
          this.msgProductFile = {};
        });
    });
  }
  showModalAddProduct(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  openEditProduct(template: TemplateRef<any>, item: any) {
    //localStorage.setItem('productId', item.id);

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.ProductName = item.name;
    this.productPrice = item.price;
    this.productArticles = item.articles;
    this.productLink = item.product_link;
    this.urlPicture =
      'https://api.aroundorder.com:1337/api/user/products/' +
      this.userObject.rest_id +
      '/' +
      item.picture_name;
    $('#editProductId').val(item.id);
  }

  confirmEditProduct() {
    const id = $('#editProductId').val();
    var pic = '';
    let arrayProd = this.listShopProducts;
    var indexOf = arrayProd.findIndex((element) => element.id === parseInt(id));
    arrayProd[indexOf].name = this.ProductName;
    arrayProd[indexOf].price = this.productPrice;
    arrayProd[indexOf].product_link = this.productLink;
    arrayProd[indexOf].articles = this.productArticles;

    if (this.filesProducts[0]) {
      pic = Date.now() + '.png';
      arrayProd[indexOf].picture_name = pic;
      const formData = new FormData();
      formData.append(
        'file',
        this.filesProducts[0],
        'user' + this.userObject.rest_id + '-' + pic
      );
      if (this.filesProducts[0]['ToUpload'] == false) {
        this.msgProductFile = {
          name_en:
            'Upload failed!! Max size of a file allowed is 5Mb, files with size more than 5Mb are discarded.',
          name_fr:
            "Le téléchargement a échoué!! La taille maximale d'un fichier autorisée est de 5 Mo, les fichiers d'une taille supérieure à 5 Mo sont rejetés.",
          name_de:
            'Upload fehlgeschlagen!! Die maximal zulässige Größe einer Datei beträgt 5 MB, Dateien mit einer Größe von mehr als 5 MB werden verworfen.',
        };
        return false;
      }
      this.shopService.uploadAttachment(formData).subscribe((data1) => {});
    }
    let prod = {
      userId: this.userObject.rest_id,
      products: arrayProd,
    };
    this.shopService.updateProduct(prod).subscribe((data) => {
      this.getAllProduct();
      this.closeEditProduct();
      this.filesProducts = [];
      this.msgProductFile = {};
    });
  }

  showModalAddNewLocation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  addressToLookingFor: any;
  getLocalisation() {}

  lookingForLocation() {
    var autocomplete = new google.maps.places.Autocomplete(
      $('#new_address')[0] as HTMLInputElement,
      {}
    );

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
      $('#new_address')[0] as HTMLInputElement,
      {}
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      ////////////////console.log(place.address_components);

      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];

        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];
          ////////// ////////// // // ////conslog(val);

          if (addressType == 'locality') {
            $('#new_city').val(val);
            var ort = $('#new_city').val();
          }
          if (addressType == 'postal_code') {
            $('#new_zip').val(val);
            var code = $('#new_zip').val();
          }

          if (addressType == 'administrative_area_level_1') {
            $('#new_state').val(val);
            var state = $('#new_state').val();
          }
          if (addressType == 'country') {
            $('#new_country').val(val);
            var city = $('#new_country').val();
          }
        }
      }
      $('.showInfo').css('display', 'block');
    });

    /*     var city = $('#search_city').val();
        var zip = $('#search_zip').val();
        var long = $('#search_lng').val();
        var lat = $('#search_lat').val(); */
    if ($('#new_address').val() == '') {
      $('#new_city').val('');
      $('#new_zip').val('');
      $('#new_lng').val('');
      $('#new_ltd').val('');
      $('.showInfo').css('display', 'none');
    }
  }

  openLocationDetails(id: any) {
    $('#section-location' + id).css('display', 'block');
  }
  holderser: any = {
    languages: {
      name_en: 'exp( replacing toilet flush, Live cover band ...) ',
      name_fr:
        'exp( remplacement des tuyaux de drainage endommagés , Groupe de reprises en direct ...)  ',
      name_de: 'exp( Spülkasten Austauschen ,Live-Coverband ... )  ',
    },
  };
  holdercat: any = {
    languages: {
      name_en: 'exp( Plumbery , Art & Music ....)',
      name_fr: 'exp( Plomberie , Art & Musique ....)',
      name_de: 'exp( Sanitär & Klempnerarbeiten, Kunst & Musik ...)',
    },
  };

  businessArea: any = {
    languages: {
      name_en: 'exp(  Changing flush, Bands ....)',
      name_fr: "exp( Changer la chasse d'eau , Bandes ....)",
      name_de: 'exp( Spülung wechseln  , Bänder ...)',
    },
  };
  items = [
    {
      name_en: 'About me',
      name_fr: 'À propos de moi',
      name_de: 'Über mich',
    },
    {
      name_en: 'Account Details',
      name_fr: 'Détails du compte',
      name_de: 'Kontodetails',
    },
    {
      name_en: 'Company Details',
      name_fr: "Détails de l'entreprise",
      name_de: 'Unternehmens-Details',
    },
    {
      name_en: 'Contact Details',
      name_fr: 'Détails du contact',
      name_de: 'Kontaktdetails',
    },
    {
      name_en: 'Locations and Services',
      name_fr: 'Lieux et services',
      name_de: 'Standorte und Dienstleistungen',
    },
    {
      name_en: 'Platform and settings',
      name_fr: 'Plateforme et paramètres',
      name_de: 'Plattform und Einstellungen',
    },
    {
      name_en: 'Banking accounts',
      name_fr: 'Comptes bancaires',
      name_de: 'Bankkonten',
    },
    {
      name_en: 'Terms and conditions',
      name_fr: 'Termes et conditions',
      name_de: 'Geschäftsbedingungen',
    },
    {
      name_en: 'Privacy policy and guidelines',
      name_fr: 'Politique de confidentialité',
      name_de: 'Datenschutzbestimmungen',
    },
  ];
  successSuggestion: any = {
    name_en: 'Success! we will check your request as soon as possible.',
    name_fr:
      'Succès! nous vérifierons votre demande dans les plus brefs délais.',
    name_de: 'Erfolg! wir werden Ihre Anfrage schnellstmöglich prüfen.',
  };
  code_phone: any = '+216';

  alertMessage(text: any) {
    Swal.fire({
      icon: 'warning',
      confirmButtonText: 'ok',
      confirmButtonColor: '#009fe3',
      text: text,
    });
  }
  successMessage(text: any) {
    Swal.fire({
      icon: 'success',
      confirmButtonText: 'ok',
      confirmButtonColor: '#009fe3',
      text: text,
    });
  }

  hideMessageAfterTime(element: any) {
    setTimeout(() => {
      this.securitySuccess = false;
      this.securityFailed = false;
    }, 2000);
  }
  getPhoneCode(event: any) {
    // // ////////// // // ////conslog(event.target.value.split(" ")[0].toLowerCase());
    this.personalInfo.code_phone = this.getPhoneCountryCode(
      event.target.value.split(' ')[0]
    ).toLowerCase();
  }

  getPhoneCountryCode(code: any) {
    let obj = this.codesPhones.find((o) => o.dial_code === code);
    return obj.code;
  }

  getMobileCode(number: any) {
    ////////////////////console.log(number);

    let obj = this.codesPhones.find((o) => number.includes(o.dial_code));
    if (obj) return obj.dial_code;
    else return '';
  }

  getMobileCountryCode(code: any) {
    let obj = this.codesPhones.find((o) => o.dial_code === code);
    return obj.code;
  }

  getCurrentCodeCountry(number: any) {
    let obj = this.codesPhones.find((o) => number.includes(o.dial_code));
    if (obj) return obj.code.toLowerCase();
    else return 'de';
  }

  countCodeCountry(number: any) {
    let obj = this.codesPhones.find((o) => number.includes(o.dial_code));
    if (obj) return obj.code.length;
    else return 0;
  }

  getDialCode(number: any) {
    let obj = this.codesPhones.find((o) => number.includes(o.dial_code));
    if (obj) return obj.dial_code;
    else return '';
  }

  codesPhones = [
    {
      name: 'Afghanistan',
      dial_code: '+93',
      code: 'AF',
    },
    {
      name: 'Aland Islands',
      dial_code: '+358',
      code: 'AX',
    },
    {
      name: 'Albania',
      dial_code: '+355',
      code: 'AL',
    },
    {
      name: 'Algeria',
      dial_code: '+213',
      code: 'DZ',
    },
    {
      name: 'AmericanSamoa',
      dial_code: '+1684',
      code: 'AS',
    },
    {
      name: 'Andorra',
      dial_code: '+376',
      code: 'AD',
    },
    {
      name: 'Angola',
      dial_code: '+244',
      code: 'AO',
    },
    {
      name: 'Anguilla',
      dial_code: '+1264',
      code: 'AI',
    },
    {
      name: 'Antarctica',
      dial_code: '+672',
      code: 'AQ',
    },
    {
      name: 'Antigua and Barbuda',
      dial_code: '+1268',
      code: 'AG',
    },
    {
      name: 'Argentina',
      dial_code: '+54',
      code: 'AR',
    },
    {
      name: 'Armenia',
      dial_code: '+374',
      code: 'AM',
    },
    {
      name: 'Aruba',
      dial_code: '+297',
      code: 'AW',
    },
    {
      name: 'Australia',
      dial_code: '+61',
      code: 'AU',
    },
    {
      name: 'Austria',
      dial_code: '+43',
      code: 'AT',
    },
    {
      name: 'Azerbaijan',
      dial_code: '+994',
      code: 'AZ',
    },
    {
      name: 'Bahamas',
      dial_code: '+1242',
      code: 'BS',
    },
    {
      name: 'Bahrain',
      dial_code: '+973',
      code: 'BH',
    },
    {
      name: 'Bangladesh',
      dial_code: '+880',
      code: 'BD',
    },
    {
      name: 'Barbados',
      dial_code: '+1246',
      code: 'BB',
    },
    {
      name: 'Belarus',
      dial_code: '+375',
      code: 'BY',
    },
    {
      name: 'Belgium',
      dial_code: '+32',
      code: 'BE',
    },
    {
      name: 'Belize',
      dial_code: '+501',
      code: 'BZ',
    },
    {
      name: 'Benin',
      dial_code: '+229',
      code: 'BJ',
    },
    {
      name: 'Bermuda',
      dial_code: '+1441',
      code: 'BM',
    },
    {
      name: 'Bhutan',
      dial_code: '+975',
      code: 'BT',
    },
    {
      name: 'Bolivia, Plurinational State of',
      dial_code: '+591',
      code: 'BO',
    },
    {
      name: 'Bosnia and Herzegovina',
      dial_code: '+387',
      code: 'BA',
    },
    {
      name: 'Botswana',
      dial_code: '+267',
      code: 'BW',
    },
    {
      name: 'Brazil',
      dial_code: '+55',
      code: 'BR',
    },
    {
      name: 'British Indian Ocean Territory',
      dial_code: '+246',
      code: 'IO',
    },
    {
      name: 'Brunei Darussalam',
      dial_code: '+673',
      code: 'BN',
    },
    {
      name: 'Bulgaria',
      dial_code: '+359',
      code: 'BG',
    },
    {
      name: 'Burkina Faso',
      dial_code: '+226',
      code: 'BF',
    },
    {
      name: 'Burundi',
      dial_code: '+257',
      code: 'BI',
    },
    {
      name: 'Cambodia',
      dial_code: '+855',
      code: 'KH',
    },
    {
      name: 'Cameroon',
      dial_code: '+237',
      code: 'CM',
    },
    {
      name: 'Canada',
      dial_code: '+1',
      code: 'CA',
    },
    {
      name: 'Cape Verde',
      dial_code: '+238',
      code: 'CV',
    },
    {
      name: 'Cayman Islands',
      dial_code: '+ 345',
      code: 'KY',
    },
    {
      name: 'Central African Republic',
      dial_code: '+236',
      code: 'CF',
    },
    {
      name: 'Chad',
      dial_code: '+235',
      code: 'TD',
    },
    {
      name: 'Chile',
      dial_code: '+56',
      code: 'CL',
    },
    {
      name: 'China',
      dial_code: '+86',
      code: 'CN',
    },
    {
      name: 'Christmas Island',
      dial_code: '+61',
      code: 'CX',
    },
    {
      name: 'Cocos (Keeling) Islands',
      dial_code: '+61',
      code: 'CC',
    },
    {
      name: 'Colombia',
      dial_code: '+57',
      code: 'CO',
    },
    {
      name: 'Comoros',
      dial_code: '+269',
      code: 'KM',
    },
    {
      name: 'Congo',
      dial_code: '+242',
      code: 'CG',
    },
    {
      name: 'Congo, The Democratic Republic of the Congo',
      dial_code: '+243',
      code: 'CD',
    },
    {
      name: 'Cook Islands',
      dial_code: '+682',
      code: 'CK',
    },
    {
      name: 'Costa Rica',
      dial_code: '+506',
      code: 'CR',
    },
    {
      name: "Cote d'Ivoire",
      dial_code: '+225',
      code: 'CI',
    },
    {
      name: 'Croatia',
      dial_code: '+385',
      code: 'HR',
    },
    {
      name: 'Cuba',
      dial_code: '+53',
      code: 'CU',
    },
    {
      name: 'Cyprus',
      dial_code: '+357',
      code: 'CY',
    },
    {
      name: 'Czech Republic',
      dial_code: '+420',
      code: 'CZ',
    },
    {
      name: 'Denmark',
      dial_code: '+45',
      code: 'DK',
    },
    {
      name: 'Djibouti',
      dial_code: '+253',
      code: 'DJ',
    },
    {
      name: 'Dominica',
      dial_code: '+1767',
      code: 'DM',
    },
    {
      name: 'Dominican Republic',
      dial_code: '+1849',
      code: 'DO',
    },
    {
      name: 'Ecuador',
      dial_code: '+593',
      code: 'EC',
    },
    {
      name: 'Egypt',
      dial_code: '+20',
      code: 'EG',
    },
    {
      name: 'El Salvador',
      dial_code: '+503',
      code: 'SV',
    },
    {
      name: 'Equatorial Guinea',
      dial_code: '+240',
      code: 'GQ',
    },
    {
      name: 'Eritrea',
      dial_code: '+291',
      code: 'ER',
    },
    {
      name: 'Estonia',
      dial_code: '+372',
      code: 'EE',
    },
    {
      name: 'Ethiopia',
      dial_code: '+251',
      code: 'ET',
    },
    {
      name: 'Falkland Islands (Malvinas)',
      dial_code: '+500',
      code: 'FK',
    },
    {
      name: 'Faroe Islands',
      dial_code: '+298',
      code: 'FO',
    },
    {
      name: 'Fiji',
      dial_code: '+679',
      code: 'FJ',
    },
    {
      name: 'Finland',
      dial_code: '+358',
      code: 'FI',
    },
    {
      name: 'France',
      dial_code: '+33',
      code: 'FR',
    },
    {
      name: 'French Guiana',
      dial_code: '+594',
      code: 'GF',
    },
    {
      name: 'French Polynesia',
      dial_code: '+689',
      code: 'PF',
    },
    {
      name: 'Gabon',
      dial_code: '+241',
      code: 'GA',
    },
    {
      name: 'Gambia',
      dial_code: '+220',
      code: 'GM',
    },
    {
      name: 'Georgia',
      dial_code: '+995',
      code: 'GE',
    },
    {
      name: 'Germany',
      dial_code: '+49',
      code: 'DE',
    },
    {
      name: 'Ghana',
      dial_code: '+233',
      code: 'GH',
    },
    {
      name: 'Gibraltar',
      dial_code: '+350',
      code: 'GI',
    },
    {
      name: 'Greece',
      dial_code: '+30',
      code: 'GR',
    },
    {
      name: 'Greenland',
      dial_code: '+299',
      code: 'GL',
    },
    {
      name: 'Grenada',
      dial_code: '+1473',
      code: 'GD',
    },
    {
      name: 'Guadeloupe',
      dial_code: '+590',
      code: 'GP',
    },
    {
      name: 'Guam',
      dial_code: '+1671',
      code: 'GU',
    },
    {
      name: 'Guatemala',
      dial_code: '+502',
      code: 'GT',
    },
    {
      name: 'Guernsey',
      dial_code: '+44',
      code: 'GG',
    },
    {
      name: 'Guinea',
      dial_code: '+224',
      code: 'GN',
    },
    {
      name: 'Guinea-Bissau',
      dial_code: '+245',
      code: 'GW',
    },
    {
      name: 'Guyana',
      dial_code: '+595',
      code: 'GY',
    },
    {
      name: 'Haiti',
      dial_code: '+509',
      code: 'HT',
    },
    {
      name: 'Holy See (Vatican City State)',
      dial_code: '+379',
      code: 'VA',
    },
    {
      name: 'Honduras',
      dial_code: '+504',
      code: 'HN',
    },
    {
      name: 'Hong Kong',
      dial_code: '+852',
      code: 'HK',
    },
    {
      name: 'Hungary',
      dial_code: '+36',
      code: 'HU',
    },
    {
      name: 'Iceland',
      dial_code: '+354',
      code: 'IS',
    },
    {
      name: 'India',
      dial_code: '+91',
      code: 'IN',
    },
    {
      name: 'Indonesia',
      dial_code: '+62',
      code: 'ID',
    },
    {
      name: 'Iran, Islamic Republic of Persian Gulf',
      dial_code: '+98',
      code: 'IR',
    },
    {
      name: 'Iraq',
      dial_code: '+964',
      code: 'IQ',
    },
    {
      name: 'Ireland',
      dial_code: '+353',
      code: 'IE',
    },
    {
      name: 'Isle of Man',
      dial_code: '+44',
      code: 'IM',
    },
    {
      name: 'Israel',
      dial_code: '+972',
      code: 'IL',
    },
    {
      name: 'Italy',
      dial_code: '+39',
      code: 'IT',
    },
    {
      name: 'Jamaica',
      dial_code: '+1876',
      code: 'JM',
    },
    {
      name: 'Japan',
      dial_code: '+81',
      code: 'JP',
    },
    {
      name: 'Jersey',
      dial_code: '+44',
      code: 'JE',
    },
    {
      name: 'Jordan',
      dial_code: '+962',
      code: 'JO',
    },
    {
      name: 'Kazakhstan',
      dial_code: '+77',
      code: 'KZ',
    },
    {
      name: 'Kenya',
      dial_code: '+254',
      code: 'KE',
    },
    {
      name: 'Kiribati',
      dial_code: '+686',
      code: 'KI',
    },
    {
      name: "Korea, Democratic People's Republic of Korea",
      dial_code: '+850',
      code: 'KP',
    },
    {
      name: 'Korea, Republic of South Korea',
      dial_code: '+82',
      code: 'KR',
    },
    {
      name: 'Kuwait',
      dial_code: '+965',
      code: 'KW',
    },
    {
      name: 'Kyrgyzstan',
      dial_code: '+996',
      code: 'KG',
    },
    {
      name: 'Laos',
      dial_code: '+856',
      code: 'LA',
    },
    {
      name: 'Latvia',
      dial_code: '+371',
      code: 'LV',
    },
    {
      name: 'Lebanon',
      dial_code: '+961',
      code: 'LB',
    },
    {
      name: 'Lesotho',
      dial_code: '+266',
      code: 'LS',
    },
    {
      name: 'Liberia',
      dial_code: '+231',
      code: 'LR',
    },
    {
      name: 'Libyan Arab Jamahiriya',
      dial_code: '+218',
      code: 'LY',
    },
    {
      name: 'Liechtenstein',
      dial_code: '+423',
      code: 'LI',
    },
    {
      name: 'Lithuania',
      dial_code: '+370',
      code: 'LT',
    },
    {
      name: 'Luxembourg',
      dial_code: '+352',
      code: 'LU',
    },
    {
      name: 'Macao',
      dial_code: '+853',
      code: 'MO',
    },
    {
      name: 'Macedonia',
      dial_code: '+389',
      code: 'MK',
    },
    {
      name: 'Madagascar',
      dial_code: '+261',
      code: 'MG',
    },
    {
      name: 'Malawi',
      dial_code: '+265',
      code: 'MW',
    },
    {
      name: 'Malaysia',
      dial_code: '+60',
      code: 'MY',
    },
    {
      name: 'Maldives',
      dial_code: '+960',
      code: 'MV',
    },
    {
      name: 'Mali',
      dial_code: '+223',
      code: 'ML',
    },
    {
      name: 'Malta',
      dial_code: '+356',
      code: 'MT',
    },
    {
      name: 'Marshall Islands',
      dial_code: '+692',
      code: 'MH',
    },
    {
      name: 'Martinique',
      dial_code: '+596',
      code: 'MQ',
    },
    {
      name: 'Mauritania',
      dial_code: '+222',
      code: 'MR',
    },
    {
      name: 'Mauritius',
      dial_code: '+230',
      code: 'MU',
    },
    {
      name: 'Mayotte',
      dial_code: '+262',
      code: 'YT',
    },
    {
      name: 'Mexico',
      dial_code: '+52',
      code: 'MX',
    },
    {
      name: 'Micronesia, Federated States of Micronesia',
      dial_code: '+691',
      code: 'FM',
    },
    {
      name: 'Moldova',
      dial_code: '+373',
      code: 'MD',
    },
    {
      name: 'Monaco',
      dial_code: '+377',
      code: 'MC',
    },
    {
      name: 'Mongolia',
      dial_code: '+976',
      code: 'MN',
    },
    {
      name: 'Montenegro',
      dial_code: '+382',
      code: 'ME',
    },
    {
      name: 'Montserrat',
      dial_code: '+1664',
      code: 'MS',
    },
    {
      name: 'Morocco',
      dial_code: '+212',
      code: 'MA',
    },
    {
      name: 'Mozambique',
      dial_code: '+258',
      code: 'MZ',
    },
    {
      name: 'Myanmar',
      dial_code: '+95',
      code: 'MM',
    },
    {
      name: 'Namibia',
      dial_code: '+264',
      code: 'NA',
    },
    {
      name: 'Nauru',
      dial_code: '+674',
      code: 'NR',
    },
    {
      name: 'Nepal',
      dial_code: '+977',
      code: 'NP',
    },
    {
      name: 'Netherlands',
      dial_code: '+31',
      code: 'NL',
    },
    {
      name: 'Netherlands Antilles',
      dial_code: '+599',
      code: 'AN',
    },
    {
      name: 'New Caledonia',
      dial_code: '+687',
      code: 'NC',
    },
    {
      name: 'New Zealand',
      dial_code: '+64',
      code: 'NZ',
    },
    {
      name: 'Nicaragua',
      dial_code: '+505',
      code: 'NI',
    },
    {
      name: 'Niger',
      dial_code: '+227',
      code: 'NE',
    },
    {
      name: 'Nigeria',
      dial_code: '+234',
      code: 'NG',
    },
    {
      name: 'Niue',
      dial_code: '+683',
      code: 'NU',
    },
    {
      name: 'Norfolk Island',
      dial_code: '+672',
      code: 'NF',
    },
    {
      name: 'Northern Mariana Islands',
      dial_code: '+1670',
      code: 'MP',
    },
    {
      name: 'Norway',
      dial_code: '+47',
      code: 'NO',
    },
    {
      name: 'Oman',
      dial_code: '+968',
      code: 'OM',
    },
    {
      name: 'Pakistan',
      dial_code: '+92',
      code: 'PK',
    },
    {
      name: 'Palau',
      dial_code: '+680',
      code: 'PW',
    },
    {
      name: 'Palestinian Territory, Occupied',
      dial_code: '+970',
      code: 'PS',
    },
    {
      name: 'Panama',
      dial_code: '+507',
      code: 'PA',
    },
    {
      name: 'Papua New Guinea',
      dial_code: '+675',
      code: 'PG',
    },
    {
      name: 'Paraguay',
      dial_code: '+595',
      code: 'PY',
    },
    {
      name: 'Peru',
      dial_code: '+51',
      code: 'PE',
    },
    {
      name: 'Philippines',
      dial_code: '+63',
      code: 'PH',
    },
    {
      name: 'Pitcairn',
      dial_code: '+872',
      code: 'PN',
    },
    {
      name: 'Poland',
      dial_code: '+48',
      code: 'PL',
    },
    {
      name: 'Portugal',
      dial_code: '+351',
      code: 'PT',
    },
    {
      name: 'Puerto Rico',
      dial_code: '+1939',
      code: 'PR',
    },
    {
      name: 'Qatar',
      dial_code: '+974',
      code: 'QA',
    },
    {
      name: 'Romania',
      dial_code: '+40',
      code: 'RO',
    },
    {
      name: 'Russia',
      dial_code: '+7',
      code: 'RU',
    },
    {
      name: 'Rwanda',
      dial_code: '+250',
      code: 'RW',
    },
    {
      name: 'Reunion',
      dial_code: '+262',
      code: 'RE',
    },
    {
      name: 'Saint Barthelemy',
      dial_code: '+590',
      code: 'BL',
    },
    {
      name: 'Saint Helena, Ascension and Tristan Da Cunha',
      dial_code: '+290',
      code: 'SH',
    },
    {
      name: 'Saint Kitts and Nevis',
      dial_code: '+1869',
      code: 'KN',
    },
    {
      name: 'Saint Lucia',
      dial_code: '+1758',
      code: 'LC',
    },
    {
      name: 'Saint Martin',
      dial_code: '+590',
      code: 'MF',
    },
    {
      name: 'Saint Pierre and Miquelon',
      dial_code: '+508',
      code: 'PM',
    },
    {
      name: 'Saint Vincent and the Grenadines',
      dial_code: '+1784',
      code: 'VC',
    },
    {
      name: 'Samoa',
      dial_code: '+685',
      code: 'WS',
    },
    {
      name: 'San Marino',
      dial_code: '+378',
      code: 'SM',
    },
    {
      name: 'Sao Tome and Principe',
      dial_code: '+239',
      code: 'ST',
    },
    {
      name: 'Saudi Arabia',
      dial_code: '+966',
      code: 'SA',
    },
    {
      name: 'Senegal',
      dial_code: '+221',
      code: 'SN',
    },
    {
      name: 'Serbia',
      dial_code: '+381',
      code: 'RS',
    },
    {
      name: 'Seychelles',
      dial_code: '+248',
      code: 'SC',
    },
    {
      name: 'Sierra Leone',
      dial_code: '+232',
      code: 'SL',
    },
    {
      name: 'Singapore',
      dial_code: '+65',
      code: 'SG',
    },
    {
      name: 'Slovakia',
      dial_code: '+421',
      code: 'SK',
    },
    {
      name: 'Slovenia',
      dial_code: '+386',
      code: 'SI',
    },
    {
      name: 'Solomon Islands',
      dial_code: '+677',
      code: 'SB',
    },
    {
      name: 'Somalia',
      dial_code: '+252',
      code: 'SO',
    },
    {
      name: 'South Africa',
      dial_code: '+27',
      code: 'ZA',
    },
    {
      name: 'South Sudan',
      dial_code: '+211',
      code: 'SS',
    },
    {
      name: 'South Georgia and the South Sandwich Islands',
      dial_code: '+500',
      code: 'GS',
    },
    {
      name: 'Spain',
      dial_code: '+34',
      code: 'ES',
    },
    {
      name: 'Sri Lanka',
      dial_code: '+94',
      code: 'LK',
    },
    {
      name: 'Sudan',
      dial_code: '+249',
      code: 'SD',
    },
    {
      name: 'Suriname',
      dial_code: '+597',
      code: 'SR',
    },
    {
      name: 'Svalbard and Jan Mayen',
      dial_code: '+47',
      code: 'SJ',
    },
    {
      name: 'Swaziland',
      dial_code: '+268',
      code: 'SZ',
    },
    {
      name: 'Sweden',
      dial_code: '+46',
      code: 'SE',
    },
    {
      name: 'Switzerland',
      dial_code: '+41',
      code: 'CH',
    },
    {
      name: 'Syrian Arab Republic',
      dial_code: '+963',
      code: 'SY',
    },
    {
      name: 'Taiwan',
      dial_code: '+886',
      code: 'TW',
    },
    {
      name: 'Tajikistan',
      dial_code: '+992',
      code: 'TJ',
    },
    {
      name: 'Tanzania, United Republic of Tanzania',
      dial_code: '+255',
      code: 'TZ',
    },
    {
      name: 'Thailand',
      dial_code: '+66',
      code: 'TH',
    },
    {
      name: 'Timor-Leste',
      dial_code: '+670',
      code: 'TL',
    },
    {
      name: 'Togo',
      dial_code: '+228',
      code: 'TG',
    },
    {
      name: 'Tokelau',
      dial_code: '+690',
      code: 'TK',
    },
    {
      name: 'Tonga',
      dial_code: '+676',
      code: 'TO',
    },
    {
      name: 'Trinidad and Tobago',
      dial_code: '+1868',
      code: 'TT',
    },
    {
      name: 'Tunisia',
      dial_code: '+216',
      code: 'TN',
    },
    {
      name: 'Turkey',
      dial_code: '+90',
      code: 'TR',
    },
    {
      name: 'Turkmenistan',
      dial_code: '+993',
      code: 'TM',
    },
    {
      name: 'Turks and Caicos Islands',
      dial_code: '+1649',
      code: 'TC',
    },
    {
      name: 'Tuvalu',
      dial_code: '+688',
      code: 'TV',
    },
    {
      name: 'Uganda',
      dial_code: '+256',
      code: 'UG',
    },
    {
      name: 'Ukraine',
      dial_code: '+380',
      code: 'UA',
    },
    {
      name: 'United Arab Emirates',
      dial_code: '+971',
      code: 'AE',
    },
    {
      name: 'United Kingdom',
      dial_code: '+44',
      code: 'GB',
    },
    {
      name: 'United States',
      dial_code: '+1',
      code: 'US',
    },
    {
      name: 'Uruguay',
      dial_code: '+598',
      code: 'UY',
    },
    {
      name: 'Uzbekistan',
      dial_code: '+998',
      code: 'UZ',
    },
    {
      name: 'Vanuatu',
      dial_code: '+678',
      code: 'VU',
    },
    {
      name: 'Venezuela, Bolivarian Republic of Venezuela',
      dial_code: '+58',
      code: 'VE',
    },
    {
      name: 'Vietnam',
      dial_code: '+84',
      code: 'VN',
    },
    {
      name: 'Virgin Islands, British',
      dial_code: '+1284',
      code: 'VG',
    },
    {
      name: 'Virgin Islands, U.S.',
      dial_code: '+1340',
      code: 'VI',
    },
    {
      name: 'Wallis and Futuna',
      dial_code: '+681',
      code: 'WF',
    },
    {
      name: 'Yemen',
      dial_code: '+967',
      code: 'YE',
    },
    {
      name: 'Zambia',
      dial_code: '+260',
      code: 'ZM',
    },
    {
      name: 'Zimbabwe',
      dial_code: '+263',
      code: 'ZW',
    },
  ];

  showSuggestion: boolean = false;
  newArr: any[] = [];
  result_search: any[] = [];
  filtredCategories: any[] = [];
  filtredSubCatg: any[] = [];
  filtredServices: any[] = [];
  arraytest: any[] = [];
  filterServices(value: any) {
    this.filtredCategories = [];
    this.filtredServices = [];
    this.filtredSubCatg = [];
    //this.searchServiceWebHeader1 = value;
    // this.sendjoinreq(value);
    if (value) {
      this.showSuggestion = true;
      var sp = value.split(' ');
      for (var i = 0; i < sp.length; i++) {
        if (!this.isEmptyOrSpaces(sp[i])) {
          //////////// // // ////conslog(this.filterItems(this.Allserviceslist, sp[i]));

          this.newArr = this.filterItems(this.Allsuggestions, sp[i]);
        }
      }
      this.result_search = this.newArr;
      this.newArr.forEach((element) => {
        if (element.type === 'category') {
          this.filtredCategories.push(element.category_id);
          this.allServices.filter((ee) => {
            ee.id == element.category_id;
          });
        }
        if (element.type === 'sub_category') {
          this.filtredSubCatg.push(element.id);
          this.filtredCategories.push(element.category_id);

          this.allServices.filter((ee) => {
            ee.id == element.category_id;
          });
        }
        if (element.type === 'service') {
          this.filtredCategories.push(element.category_id);

          this.filtredSubCatg.push(element.subcategory_id);
          this.filtredServices.push(element.id);
          this.filtredCategories.push(element.category_id);
          this.allServices.filter((ee) => {
            ee.id == element.category_id;
          });
        }
      });
    } else {
      this.result_search = [];
      // this.searchSeletedService = null;
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

  checkitemCateg(val: any): boolean {
    if (this.filtredCategories.indexOf(val) < 0) {
      return false;
    } else {
      return true;
    }
  }
  checkitemSubCatg(val: any): boolean {
    if (this.filtredSubCatg.indexOf(val) < 0) {
      return false;
    } else {
      return true;
    }
  }
  checkitemService(val: any): boolean {
    if (this.filtredServices.indexOf(val) < 0) {
      return false;
    } else {
      return true;
    }
  }
  updateview() {
    ////////// // // ////conslog(this.allServices);
  }

  showInputTags: boolean = false;
  newHashtag: any;
  hashtagsMessages = {
    name_en: 'hashtag cannot have whitespace.',
    name_fr: "le hashtag ne peut pas avoir d'espace blanc",
    name_de: 'Hashtags dürfen keine Leerzeichen enthalten',
  };
  hashtagsMessagesFull = {
    name_en: 'You have atteint the maximum number of keywords allowed.',
    name_fr: 'Vous avez atteint le nombre maximum de mots-clés autorisés',
    name_de:
      'Sie haben die maximal zulässige Anzahl von Schlüsselwörtern erreicht',
  };
  addText: any = {
    name_en: 'Add',
    name_fr: 'Ajouter',
    name_de: 'Addieren',
  };

  accordionOpened: boolean = false;
  addHashtags() {
    const str = this.newHashtag;
    if (this.newHashtag) {
      /* if (this.hasWhiteSpace(this.newHashtag)) {
        this.alertMessage(this.hashtagsMessages[this.serviceLang]);
        return false;
      }*/
      if (this.hashtags.length == 4) {
        this.alertMessage(this.hashtagsMessagesFull[this.serviceLang]);
        return false;
      }
      this.hashtags.push({ display: this.newHashtag, value: this.newHashtag });
      let objHs = {
        id: this.companyConnected.id,
        hashtags: this.hashtags,
      };
      this.companyService.updateCompany(objHs).subscribe((data) => {
        this.newHashtag = '';
      });
    }
  }
  hasWhiteSpace(s: any) {
    return /\s/g.test(s);
  }
  closeHashtags() {
    this.showInputTags = false;
    this.newHashtag = '';
  }
  checkIfValidHashtag(str: any) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  openCloseAccordion(index: any) {
    const previous = index - 1;
    const next = index + 1;
    const current = index;
    this.items.forEach((element, i) => {
      if ($('#accordion-body-' + index).is(':visible')) {
        $('#accordion-body-' + index).css('display', 'none');
        $('#accordion-body-' + next).css('display', 'block');
      } else {
        $('#accordion-body-' + index).css('display', 'block');
        $('#accordion-body-' + next).css('display', 'none');
        $('#accordion-body-' + previous).css('display', 'none');
      }
    });
  }
  servicesFields: any[] = [];
  listNewServices: any[] = [];
  showNewSuggestionSection: boolean = false;
  showNewSuggestionSectionSub: boolean = false;
  openAndShowSuggestSection() {
    this.showNewSuggestionSection = true;
  }
  openAndShowSuggestSubSection() {
    this.showNewSuggestionSectionSub = true;
  }

  addNewServiceFiled() {
    if (this.checkInputElements()) {
      this.servicesFields.push(this.servicesFields.length + 1);
    }
  }
  deleteField(i: any) {
    let fields = this.servicesFields.indexOf(i);
    this.servicesFields.splice(fields, 1);
    ////////// // // ////conslog(this.servicesFields);
  }
  showkeywords(id: any) {
    this.ListWordsSelected = [];
    let append = '';

    this.companyKeywords = this.companyKeywords.filter(
      (el) => el.subField === id
    );

    if (this.companyKeywords.length > 0) {
      this.companyKeywords.forEach((el) => {
        append += el.text + ', \n';
        if (this.keywordStandards.length > 0) {
          this.keywordStandards
            .filter((ee) => ee.id === id)
            .forEach((e1) => {
              e1.services.forEach((e2) => {
                // ////conslog(e2.languages + '===>' + el.text);
                if (e2.languages === el.text)
                  this.ListWordsSelected.push({ id: e2.id, name: el.text });
              });
            });
        }
      });
      // ////conslog(this.ListWordsSelected);

      $('#termsWordsList' + id).val(append);
    }
  }

  checkIfServiceExist(id: any, array: any) {
    let found;
  }

  companyKeywords: any[] = [];
  allkeywordsCompanies: any[] = [];
  allKeywordsToVerfiy: any[] = [];
  getKeywordsByCompany(referenceId: any) {
    this.companyService
      .getKeywordsByCompanies({ referenceId: referenceId, type: 'company' })
      .subscribe((data) => {
        // // ////conslog(data);

        data.keyword[0].list_words = JSON.parse(data.keyword[0].list_words);
        this.allKeywordsToVerfiy = data.keyword[0].list_words;
        this.companyKeywords = data.keyword[0].list_words.filter(
          (el) => el.is_dafault === false
        );
        this.allkeywordsCompanies = data.keyword[0].list_words.filter(
          (el) => el.is_dafault === true
        );
        ////////console.log(this.companyKeywords);
      });
  }

  createNewService(id: any) {
    this.listNewServices.push($('#newServiceSug' + id).val());
  }

  checkInputElements() {
    for (let i = 0; i < 100; i++) {
      if ($('#newServiceSug' + i).val() === '') {
        return false;
      }
    }
    return true;
  }
  checkAlphNumeric(str: any) {
    if (str.match(/^[0-9A-Za-z]+$/) === null) {
      return false;
    } else {
      return true;
    }
  }

  /* DROPZONE */
  labelProduct: any = {
    name_en: 'Add picture of product',
    name_fr: 'Ajouter une photo du produit',
    name_de: 'Produktbild hinzufügen',
  };
  labelGallery: any = {
    name_en: 'Add pictures and videos to catalog',
    name_fr: 'Ajouter des photos et des vidéos au catalogue',
    name_de: 'Bilder und Videos zum Katalog hinzufügen',
  };

  bankTitle: any = {
    name_en:
      'Why are we asking for your bank details here?\nIn Tanduu you will find an accounting module. If you create an invoice in TanDuu and send the invoice to your customer, your bank details will automatically be entered into your prepared invoice form so that the customer knows where to transfer the money to. TanDuu will never pass on your bank details to third parties without being asked.',
    name_de:
      'Warum fragen wir hier nach Ihrer Bankverbindung?\nIn Tanduu finden Sie ein Modul Rechnungswesen. Wenn Sie in TanDuu eine Rechnung erstellen und die Rechnung an Ihre Kunden versenden, wird Ihre Bankverbindung automatisch in Ihr vorbereitetes Rechnungsformular eingefügt, damit der Kunde weiss, wohin er Ihnen das Geld überweisen soll. TanDuu wird Ihre bankdaten nie ungefragt an Dritte weitergeben.',
    name_fr:
      "Pourquoi vous demande-t-on ici vos coordonnées bancaires ?\nDans Tanduu, vous trouverez un module de comptabilité. Si vous créez une facture dans TanDuu et envoyez la facture à votre client, vos coordonnées bancaires seront automatiquement saisies dans votre formulaire de facture préparé afin que le client sache où transférer l'argent. TanDuu ne transmettra jamais vos coordonnées bancaires à des tiers sans y être invité.",
  };
  suugest: any = {
    title: {
      name_en: 'Here you can make us new suggestions.',
      name_de: 'Hier können Sie uns neue Vorschläge machen.',
      name_fr: 'Ici vous pouvez nous faire de nouvelles suggestions.',
    },
    text: {
      name_en:
        'NOTE: we do not accept any suggestions that violate applicable law or morality!!!  If necessary, we reserve the right to reject corresponding suggestions without comment.  Thank you for your understanding.',
      name_de:
        'HINWEIS: wir akzeptieren keine Vorschläge die gegen geltendes Recht oder die guten Sitten verstoßen!!! Gegebenenfalls behalten wir uns vor, entsprechende Vorschläge kommentarlos abzulehnen. Vielen Dank für Ihr Verständnis.',
      name_fr:
        "REMARQUE : nous n'acceptons aucune suggestion contraire à la loi ou à la morale en vigueur !!! Si nécessaire, nous nous réservons le droit de rejeter les suggestions correspondantes sans commentaire. Merci pour votre compréhension.",
    },
  };
  keywordsTitle: any = {
    name_en:
      'You can add the most important keywords that make your profile appear in search result',
    name_fr:
      'Vous pouvez ajouter les mots-clés les plus importants qui font apparaître votre profil dans les résultats de recherche',
    name_de:
      'Sie können die wichtigsten Schlüsselwörter hinzufügen, die Ihr Profil in den Suchergebnissen erscheinen lassen',
  };
  showTitle(text: any) {
    Swal.fire({
      icon: 'question',
      iconColor: '#009fe3',
      html: '<div style="text-align: left; float: left;">' + text + '</div>',
      showCloseButton: true,
      confirmButtonColor: '#009fe3',
    });
  }

  showTitleDuplicate(title: any, text: any) {
    // text.split(' ')[0].css('font-weight', 'bold');
    Swal.fire({
      icon: 'question',
      iconColor: '#009fe3',
      html:
        '<div style="text-align: left; float: left;">' +
        title +
        '<br><br>' +
        text +
        '</div>',
      showCloseButton: true,
      confirmButtonColor: '#009fe3',
    });
  }
  keywordStandards: any[] = [];
  allservicestable: any[] = [];
  checkedKeys: any[] = [];
  complocations: any[] = [];
  allcategories: any[] = [];
  allsub_categories: any[] = [];
  allservices: any[] = [];

  getAllserviceKey(categoryId: any) {
    var arrayList: any = [];
    ////conslog(this.companyKeywords);
    let arrL: any = [];
    this.compser
      .getcompanylocationsandservices(this.companyConnected.id)
      .subscribe((comp: any) => {
        //////////////console.log('com');
        //////////////console.log(com.locations);
        //////////////console.log('com');

        this.complocations = comp.locations;
        ////////////console.log(this.complocations);
        this.complocations.forEach((ee) => {
          ee.services = JSON.parse(ee.services);
        });
        comp.locations.forEach((e: any) => {
          let s: any[] = e.services;
          let ex: boolean;
          let exca: boolean;
          s.forEach((ee: any) => {
            if (ee.service) {
              ex = this.allsub_categories.some((ez) => ez.id === ee.service.id);
              exca = this.allcategories.some(
                (ez) => ez.id === ee.service.category.id
              );
              if (!exca) {
                this.allcategories.push(ee.service.category);
              }

              if (!ex) {
                this.allsub_categories.push(ee.service);
              }
            }

            /*if (!ex) {
                    this.allservices.push(ee.service);
                  }*/
          });
          e.subcategories = this.allsub_categories;
          e.categories = this.allcategories;
        });

        this.allsub_categories.forEach((e) => {
          let app = '';

          if (this.IsJson(e.languages)) {
            e.languages = JSON.parse(e.languages)[this.serviceLang];
          }

          this.companyService
            .getKeywordsByCompanies({
              referenceId: this.companyConnected.id,
              type: 'company',
            })
            .subscribe((d) => {
              // // ////conslog(data);

              d.keyword[0].list_words = JSON.parse(
                d.keyword[0].list_words
              ).filter((el) => el.is_dafault === false && el.subField === e.id);
              this.checkedKeys = d.keyword[0].list_words;
              if (d.keyword[0].list_words.length > 0) {
                d.keyword[0].list_words.forEach((ll) => {
                  if (ll.is_manually === true) app += ll.text + '\n';
                });
                e['words'] = app.replace(/\n*$/, '');
              } else {
                e['words'] = '';
              }
            });
          //e.languages = JSON.parse(e.languages)[this.serviceLang];
          this.categser
            .get_servicesBysubcategoriesid(e.id)
            .subscribe((sers: any) => {
              this.allservices = sers;
              this.allservices.forEach((eeeee) => {
                eeeee.languages = JSON.parse(eeeee.languages)[this.serviceLang];
              });
              e['services'] = this.allservices;
            });
          /* this.allservices.forEach((el) => {
            this.allservicestable.push(el);
            el.languages = JSON.parse(el.languages)[this.serviceLang];
          });*/
        });
        this.keywordStandards = this.allsub_categories;
        ////////////console.log(this.keywordStandards);
      });

    // this.servicesServices

    //   .getallServiceBySubCategories({ categoryId: categoryId })
    //   .subscribe((data) => {
    //     data.data.forEach((element) => {
    //       let app = '';

    //       this.companyService
    //         .getKeywordsByCompanies({
    //           referenceId: this.companyConnected.id,
    //           type: 'company',
    //         })
    //         .subscribe((d) => {
    //           // // ////conslog(data);

    //           d.keyword[0].list_words = JSON.parse(
    //             d.keyword[0].list_words
    //           ).filter(
    //             (el) => el.is_dafault === false && el.subField === element.id
    //           );
    //           this.checkedKeys = d.keyword[0].list_words;
    //           if (d.keyword[0].list_words.length > 0) {
    //             d.keyword[0].list_words.forEach((ll) => {
    //               if (ll.is_manually === true) app += ll.text + '\n';
    //             });
    //             element['words'] = app;
    //           } else {
    //             element['words'] = '';
    //           }
    //         });

    //       element.languages = JSON.parse(element.languages)[this.serviceLang];

    //       element.services.forEach((el) => {
    //         this.allservicestable.push(el);
    //         el.languages = JSON.parse(el.languages)[this.serviceLang];
    //       });
    //       ////////////console.log(this.listCurrentFieldOfBusiness);

    //       if (this.listCurrentFieldOfBusiness.length > 0) {
    //         this.listCurrentFieldOfBusiness.forEach((eeeee) => {
    //           if (eeeee === element.id) {
    //             arrL.push(element);
    //           }
    //         });
    //         data.data = arrL;
    //       } else {
    //         data.data = [];
    //       }
    //     });
    //     this.keywordStandards = data.data;
    //     ////////////console.log(data.data);
    //   });
  }
  IsJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  addEditService: any = {
    name_en: 'Add or change services',
    name_fr: 'Ajouter ou modifier des services',
    name_de: 'Dienstleistungen hinfugen oder ändern ',
  };
  links = [
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

  getSettingName(setting: any) {
    let obj = this.links.find((el: any) => el.link === setting);

    return obj.name;
  }
  page: any = '';
  change(name) {
    this.page = name;
  }
  settingsToolTips: any = {
    name_en:
      'To be able to activate or deactivate your profile settings, you should update your informations.',
    name_fr:
      'Pour pouvoir activer ou désactiver les paramètres de votre profil, vous devez mettre à jour vos informations.',
    name_de:
      'Um Ihre Profileinstellungen aktivieren oder deaktivieren zu können, sollten Sie Ihre Informationen aktualisieren.',
  };
  addn(d: any) {
    ////////////console.log(d);
  }
  AllNeLocationsServices: any[] = [];
  getAllLocationNewVersion(id: any) {
    this.companyService.getAllLocations({ companyId: id }).subscribe((data) => {
      data.locations.forEach((element) => {
        element.services = JSON.parse(element.services);
        element['locationName'] =
          element.zip_code +
          ' ' +
          element.city +
          ' ' +
          element.state +
          ' ' +
          element.country;
        element.services.forEach((el) => {
          el.service.languages = JSON.parse(el.service.languages);
        });
      });

      this.AllNeLocationsServices = data.locations;
      //////////console.log(this.AllNeLocationsServices);
    });
  }
  alertInfoSettings() {
    Swal.fire({
      icon: 'info',
      text: this.settingsToolTips[this.serviceLang],
    });
  }
}
