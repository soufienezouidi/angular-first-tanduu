import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../admin/services/categories/services.service';
import { CompaniesService } from '../admin/services/companies_services/companies.service';
import { CommonServiceService } from '../common-service.service';
import { CategoriesService } from '../services/categories.service';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriesServices } from '../services/tandu-admin/categories.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service';
import { CompanyService } from '../services/company.service';
import { CommercialsService } from '../services/tandu-admin/commercials.service';
import Swal from 'sweetalert2';
const SOCKET_ENDPOINT = 'https://realtime.aroundorder.com:3200';
import { io } from 'socket.io-client';
import { I } from '@angular/cdk/keycodes';
declare var $: any;
declare var Morris: any;
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.css'],
})
export class RegisterPartnerComponent implements OnInit {
  companyobject: any = {
    company_name: '',
    is_agency: false,
  };
  compnamee: string = '';
  steptoshow: number = 1;
  gotostep2() {
    this.steptoshow == 2;
  }
  gotostep3() {
    this.steptoshow == 3;
  }
  modalRef: BsModalRef;

  constructor(
    public servicesService: ServicesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private servicesServices: ServicesService,
    private companyService: CompaniesService,
    private categservices: CategoriesService,
    public authserv: AuthenticationService,
    public commonService: CommonServiceService,
    public router: Router,
    private coomser: CommercialsService,
    private compser: CompanyService,
    public commserv: CommercialsService,
    public translate: TranslateService,
    public categservies: CategoriesService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
  }
  showincountry: boolean = true;
  objectInfos: any;
  name: string;
  currentLanguage: any;
  serviceLang: string;

  select: any = {
    languages: {
      name_en: 'Company',
      name_de: 'Firma',
      name_fr: 'Société',
    },
  };
  company: any = {
    languages: {
      name_en: 'i am ',
      name_fr: 'Je suis',
      name_de: 'Ich bin',
    },
  };
  fob1: any = {
    languages: {
      name_en:
        'Enter one or more terms that best describe your business or a part of it! (e.g. "Auto Mechanic", “Baby Sitter”) Then choose only one of the suggestions to identify your business field. ',
      name_fr:
        "Entrez un ou plusieurs termes qui décrivent le mieux votre entreprise ou une partie de celle-ci ! (ex. 'Mécanicien auto', 'Baby-sitter') Choisissez ensuite une seule des suggestions pour identifier votre domaine d'activité. ",
      name_de:
        'Geben Sie ein oder mehrere Begriffe ein, welche Ihr Geschäft am ehesten beschreiben! (z.B. "Auto Mechaniker", “Baby Sitter”). Dann wählen Sie eins aus, damit wir Ihr Geschäftsfeld identifizieren können. ',
    },
  };
  fob2: any = {
    languages: {
      name_en: 'Do not worry!',
      name_fr: 'Ne vous inquiétez pas!',
      name_de: 'Keine Sorge!',
    },
  };
  fob3: any = {
    languages: {
      name_en: 'Later you can add more in your profile!',
      name_fr:
        "Plus tard, vous pourrez en ajouter d'autres dans votre profil !",
      name_de: 'Sie können später Weitere in Ihrem Profil hinzufügen!',
    },
  };
  individual: any = {
    languages: {
      name_en: 'Individual',
      name_fr: 'Individuel',
      name_de: 'Person',
    },
  };
  compname: any = {
    languages: {
      name_en: 'Company Name ',
      name_de: 'Name der Firma',
      name_fr: 'Nom de la société',
    },
  };
  byphone: any = {
    languages: {
      name_en: 'By phone',
      name_de: 'Via Telefon',
      name_fr: 'Par téléphone',
    },
  };
  byemail: any = {
    languages: {
      name_en: 'By email',
      name_de: 'Per Email',
      name_fr: 'Par email',
    },
  };
  compname2: any = {
    languages: {
      name_en: 'or Full Name ',
      name_de: 'oder Vollständiger Name',
      name_fr: 'ou Nom et prénom',
    },
  };
  phone: any = {
    languages: {
      name_en: 'Phone number',
      name_de: 'Telefonnummer',
      name_fr: 'Numéro de téléphone',
    },
  };
  continue: any = {
    languages: {
      name_en: 'continue',
      name_fr: 'Continuez',
      name_de: 'Weiter',
    },
  };

  errortanduu: any = {
    languages: {
      name_en:
        'The word (Tanduu ) is not allowed to be used in any personal information',
      name_fr:
        "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
      name_de:
        'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
    },
  };
  errortype: any = {
    languages: {
      name_en: 'You must specify your company type',
      name_fr: "Vous devez spécifier votre type d'entreprise",
      name_de: 'Sie müssen Ihren Unternehmenstyp angeben',
    },
  };
  errorname: any = {
    languages: {
      name_en: 'Company name should not be empty',
      name_fr: "Le nom de l'entreprise ne doit pas être vide",
      name_de: 'Firmenname darf nicht leer sein',
    },
  };
  errorphne: any = {
    languages: {
      name_en: 'Phone number is required',
      name_fr: 'Le numéro de téléphone est requis',
      name_de: 'Nummer erforderlich',
    },
  };
  found: any = {
    languages: {
      name_en: ' I found in ',
      name_fr: " j'ai trouvé dans",
      name_de: ' Ich fand in',
    },
  };
  gotosteptwo() {
    this.router.navigateByUrl('/step2');
  }
  gotostepone() {
    this.router.navigateByUrl('/step1');
  }
  showtwo: boolean = false;
  showerrortype: boolean = false;
  gotosecondstep() {
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

    if (!this.changed) {
      this.toastr.error('', this.errortype.languages[this.serviceLang]);
      this.showerrortype = true;
      return false;
    }
    if (this.compnamee == '') {
      this.toastr.error('', this.errorname.languages[this.serviceLang]);
      return false;
    }
    if (this.compnamee.includes('tandu')) {
      this.toastr.error('', this.errortanduu.languages[this.serviceLang]);
      return false;
    }
    this.showone = false;
    this.showtwo = true;
    /*if (!this.companyobject.phone1) {
      this.toastr.error('', this.errorphne.languages[this.serviceLang]);
      return false;
    }
    if (!this.companyobject.phone1.includes('+')) {
      this.toastr.error('', messageErrorPhoneCode[this.serviceLang]);
      return false;
    }
    if (this.companyobject.phone1.length < 8) {
      this.toastr.error('', messageErrorPhoneLenght[this.serviceLang]);
      return false;
    }
*/
    this.companyobject.is_agency = this.iscompany;
  }
  gotothirdstep() {
    window.scroll(0, 0);
    this.showone = false;
    this.showtwo = false;
    this.showthree = true;
    this.selectedfieldofbuiseness.forEach((element) => {
      this.combinationarray.push(element.languages.name_en);
      this.combinationarray.push(element.languages.name_fr);
      this.combinationarray.push(element.languages.name_de);
    });
    this.combinationarray.push(this.compnamee);

    this.companyobject.is_agency = this.iscompany;
  }
  userConnected: any;
  showone: boolean = true;
  companyConnected: any;
  listcategories: any[] = [];
  countryCode: any;
  allcategories: any[] = [];
  checkValue(event: any) {
    if (this.ngSelectValues[0].service === event.id) {
      this.ngSelectValues = [];
      this.selectedcategory = null;
      window.scroll(0, 0);
    }
    if (this.chosenservicess.indexOf(event.id) < 0) {
      this.chosenservicess.push(event.id);
    } else {
      this.chosenservicess.splice(this.chosenservicess.indexOf(event.id), 1);
    }
  }

  chosenservicess: any = [];
  checkitem(val: any): boolean {
    if (this.chosenservicess.indexOf(val.id) < 0) {
      return false;
    } else {
      return true;
    }
  }
  servicess: any[] = [];
  subclicked: boolean = false;
  level1: any = true;
  level2: any = false;
  level3: any = false;
  picked;
  selectedfieldofbuiseness: any[] = [];
  showlooking: boolean = false;
  displaysub(doc: string, ids: any) {
    const index = this.selectedfieldofbuiseness.findIndex((object) => {
      return object.id === ids.id;
    });
    if (index == -1) {
      this.selectedfieldofbuiseness.push(ids);
    } else {
      this.selectedfieldofbuiseness.splice(index, 1);
    }
    ////console.log(doc);
    this.subclicked = true;
    this.picked = ids.languages[this.serviceLang];

    this.servicess = ids.services;
  }
  checkfield(val: any): boolean {
    const index = this.selectedfieldofbuiseness.findIndex((object) => {
      return object.id === val.id;
    });
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  }
  Allservices: any[] = [];
  ngSelectValues: any[] = [];
  ServicesSelectSettings: any;
  selectedcategory: any;
  mailText;
  onItemSelect(item: any) {
    this.combinationarray = [];
    this.chosenservicess = [];
    if (item.id) {
      this.showNewSuggestionSection = false;
      ////console.log(item);
      this.chosenservicess.push(item.id);
      let result: any[] = this.Allservices.filter((word) => word.id == item.id);
      this.selectedfieldofbuiseness.push(result[0].sub_category);
      this.subclicked = true;
      this.selectedcategory = result[0].categoy;
      this.showSuggestion = false;
      this.searchServiceWebHeader1 = item.text;
      this.ngSelectValues[0] = item;
    } else {
      this.showSuggestion = false;
      this.selectedfieldofbuiseness = [];
      this.mailText = 'mailto:info@tanduu.com?subject=New service suggestion'; // add the links to body
      window.location.href = this.mailText;

      this.showNewSuggestionSection = true;
      this.selectedcategory = false;
    }
    ////console.log(this.selectedcategory);
  }
  onSelectAll(items: any) {
    ////console.log(items);
  }
  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: false,
    variableWidth: true,
  };
  hidesuggestions() {
    this.showSuggestion = false;
  }
  onItemDeSelect($event) {
    this.selectedcategory = null;
    this.ngSelectValues = [];
  }
  RemoveValueCatg() {
    this.NewCatgSuggestionValue = '';
    this.ngSelectValue = '';
    this.subcatega = [];
  }

  RemoveValueSubCatg() {
    this.NewSubSuggestionValue = '';
  }

  categorySuggestSettings: any;
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;

    if (this.currentLanguage === 'de') {
      this.showincountry = false;
      this.register_mail = true;
    }
    $(document).click((event) => {
      if (!$(event.target).closest('.search-filter').length) {
        // the click occured outside '#element'
        this.showSuggestion = false;
      }
    });
    this.setupSocketConnection();
    window.scroll(0, 0);
    this.categorySuggestSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.ServicesSelectSettings = {
      clearSearchFilter: true,
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText:
        this.noAvailableData.service[this.serviceLang],
      searchPlaceholderText:
        this.noAvailableData.searchServices[this.serviceLang],
    };
    this.categservices.getcategorieswithinfos().subscribe((e: any) => {
      this.listcategories = e;
      this.listcategories.forEach((cat: any) => {
        cat.languages = JSON.parse(cat.languages);
        let sub: any[] = cat.sub_categories;
        let categobj: any = {
          id: cat.id,
          name: cat.languages[this.serviceLang],
          categ: cat,
          subservices: sub,
        };
        this.allcategories.push(categobj);
        sub.forEach((sub) => {
          sub.languages = JSON.parse(sub.languages);
          let ser: any[] = sub.services;
          ser.forEach((ser) => {
            ser.languages = JSON.parse(ser.languages);
            let servobj: any = {
              name: ser.languages[this.serviceLang],
              id: ser.id,
              service: ser,
              type: 'service',
              categoy: cat,
              categname: cat.name,
              sub_category: sub,
            };
            this.Allservices.push(servobj);
          });
        });
      });
    });
  }
  isindiv: boolean = false;
  iscompany: boolean = false;
  changed: boolean = false;
  setasindiv() {
    this.isindiv = true;
    this.iscompany = false;
    this.showerrortype = false;
    this.changed = true;
  }
  setascomp() {
    this.isindiv = false;
    this.iscompany = true;
    this.showerrortype = false;
    this.changed = true;
  }

  getMobileCode(event: any) {
    this.companyConnected.code_mobile = this.getPhoneCountryCode(
      event.target.value.split(' ')[0]
    ).toLowerCase();
  }

  getPhoneCountryCode(code: any) {
    let obj = this.codesPhones.find((o) => o.dial_code === code);
    return obj.code;
  }
  getPhoneCountryCode2(code: any) {
    let obj = this.codesPhones.find(
      (o) => o.code.toLocaleLowerCase() === code.toLowerCase()
    );
    return obj;
  }
  getCurrentCodeCountry(number: any) {
    let obj = this.codesPhones.find((o) => number.includes(o.dial_code));
    if (obj) return obj.code.toLowerCase();
    else return 'de';
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
    ////// ////console.log(this.suggestNew);
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
  showthree = false;
  showfour = false;
  gotolaststep() {
    window.scroll(0, 0);
    this.geocode($('#address').val());

    let loc = JSON.parse(localStorage.getItem('l'));
    if (!loc['longitude'] || !loc['latitude'] || !loc['city']) {
      this.toastr.error('', 'please enter a valid address');
    } else {
      let chosenposition = JSON.parse(localStorage.getItem('l'));
      this.combinationarray.push(chosenposition['city']);
      this.combinationarray.push(chosenposition['state']);
      this.combinationarray.push(chosenposition['city']);
      if (chosenposition['zip_code']) {
        this.combinationarray.push(chosenposition['zip_code']);
      }
      if (this.selectedcategory) {
        this.combinationarray.push(this.selectedcategory.languages.name_en);
        this.combinationarray.push(this.selectedcategory.languages.name_fr);
        this.combinationarray.push(this.selectedcategory.languages.name_de);
      }
      this.combinationarray.push(this.compnamee);

      this.showone = false;
      this.showtwo = false;
      this.showthree = false;
      this.showfour = true;
    }
  }
  newserviceobject: any;
  GoToLastLevel() {
    window.scroll(0, 0);
    var ctgType: boolean;
    var subCtgType: boolean;

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

    let listser: any[] = [];
    listser.push(this.NewServiceSuggestionValue);
    let obj: any = {
      is_accepted: false,
      is_deleted: false,
      suggestions: {
        category: this.NewCatgSuggestionValue,
        sub: this.NewSubSuggestionValue,
      },
    };
    this.newserviceobject = obj;
    //console.log(this.newserviceobject);
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
    Swal.fire({
      title: 'suggested',
      text: 'we will contact you as soon as possible!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',

      confirmButtonText: 'Yes, continue it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showthree = true;
        this.showtwo = false;
        this.showone = false;
      }
    });
  }
  GoToNextLevel2() {
    window.scroll(0, 0);
    this.level1 = false;
    this.level2 = true;
    this.level3 = false;
  }
  ifyou: any = {
    languages1: {
      name_en: "If you can't find your field of buiseness ",
      name_fr: 'Si vous ne trouvez pas votre catégorie ',
      name_de: 'Falls Sie Ihre Branche nicht finden ',
    },
    languages4: {
      name_en: "If you can't find your service ",
      name_fr: 'Si vous ne trouvez pas votre service ',
      name_de: 'Wenn Sie Ihren Dienst nicht finden können',
    },
    languages2: {
      name_en:
        'send us an email by clicking here (it can take from us 72 hours to respond)',
      name_fr:
        'envoyez-nous un email en cliquant ici (cela peut prendre de notre part 72 heures pour répondre)',
      name_de:
        'Senden Sie uns eine E-Mail, indem Sie hier klicken (es kann 72 Stunden dauern, bis wir antworten)',
    },
    languages3: {
      name_en: "If you can't find your branch",
      name_fr: 'pour suggérer de nouvelles branches / services',
      name_de: 'um neue Branche / Dienstleistungen vorzuschlagen',
    },
  };

  backToFirstLevel() {
    this.level1 = true;
    this.level2 = false;
    this.level3 = false;
  }
  ngSelectValue: any;
  ngSelectValueSub: any;
  ngNotSelectValue: any;
  ngNotSelectValueSub: any;
  subcateg: any;
  subcatega: any[] = [];
  getValueSub(event: any) {
    //console.log(event);
    this.NewSubSuggestionValue = {
      id: event.id,
      name: event.name,
    };
    this.ngNotSelectValueSub = '';
  }
  showSubList: boolean = false;
  sugNewSub(event: any) {
    ////console.log(event);
    this.NewSubSuggestionValue = {
      id: null,
      name: event,
    };
    this.ngSelectValueSub = {};
  }
  addFieldctg(event: any) {
    this.NewCatgSuggestionValue = {
      id: null,
      name: event,
    };
    this.ngSelectValue = {};
    this.showSubList = true;
  }
  getValue(event: any) {
    //console.log(event);
    var arrList: any[] = [];
    this.NewCatgSuggestionValue = {
      id: event.id,
      name: event.name,
    };
    this.ngNotSelectValue = '';
    this.showSubList = false;
    let result: any[] = this.allcategories.filter(
      (word) => word.id == event.id
    );
    ////console.log(result);
    this.subcatega = result[0].categ.sub_categories;
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
    let fields = this.servicesFields.indexOf(i); //get  "car" index
    this.servicesFields.splice(fields, 1);
    ////console.log(this.servicesFields);
  }
  SuggestCat: any[] = [];

  createNewService(id: any) {
    this.listNewServices.push($('#newServiceSug' + id).val());
  }
  suggestNew: any = false;
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
  SuggestionsText: any = {
    errorsBranch: {
      name_en: 'Branch field is required',
      name_fr: 'Le champ Branche est obligatoire',
      name_de: 'Filialfeld ist erforderlich',
    },
    errorsCatg: {
      name_en: 'Category field is required',
      name_fr: 'Le champ categorie est obligatoire',
      name_de: 'Das Kategoriefeld ist obligatorisch',
    },
    branchsText: {
      name_en: 'Select branch',
      name_fr: 'Sélectionnez la branche',
      name_de: 'Zweig auswählen',
      placeholderText: {
        name_en: 'Suggest new branch',
        name_fr: 'Suggérer une nouvelle branche',
        name_de: 'Neue Filiale vorschlagen',
      },
    },
    categoriesText: {
      name_en: 'Select category',
      name_fr: 'Choisir une catégorie',
      name_de: 'Kategorie wählen',
      placeholderText: {
        name_en: 'Suggest new category',
        name_fr: 'Suggérer un nouveau catégorie',
        name_de: 'Neue Kategorie vorschlagen',
      },
    },
    subText: {
      name_en: 'Select business area',
      name_fr: "Choisir une domaine d'activité",
      name_de: 'Geschäftsbereich auswählen ',
      placeholderText: {
        name_en: 'Suggest new category',
        name_fr: 'Suggérer un nouveau catégorie',
        name_de: 'Neue Kategorie vorschlagen',
      },
    },
    ServicesText: {
      name_en: 'Suggest new service',
      name_fr: 'Suggérer un nouveau service',
      name_de: 'Schlagen Sie einen neuen Dienst vor',
    },
    orText: {
      name_en: 'OR',
      name_fr: 'OU',
      name_de: 'ODER',
    },
  };
  checkInputElements() {
    for (let i = 0; i < 100; i++) {
      if ($('#newServiceSug' + i).val() === '') {
        return false;
      }
    }
    return true;
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
        'Invalid address. the city is mandatory for better search results',
      name_fr:
        'Adresse invalide. La ville est obligatoire pour de meilleurs résultats de recherche.',
      name_de:
        'Ungültige Adresse. Die Stadt ist für bessere Suchergebnisse obligatorisch',
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
  checkAddress() {
    localStorage.removeItem('l');
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
      let obj: any = {};
      var place = autocomplete.getPlace();
      ////console.log(place.address_components);
      for (var i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];

          if (addressType == 'route') {
            $('#street').val(val);
            var street = $('#street').val();
            obj['street'] = val;
          }
          if (addressType == 'street_number') {
            $('#street_nb').val(val);
            var street_nb = $('#street_nb').val();
            obj['street_nb'] = val;
          }
          if (addressType == 'locality') {
            $('#city').val(val);
            var ort = $('#city').val();
            if (val) {
              obj['city'] = val;
            }
          }
          if (addressType == 'administrative_area_level_1') {
            $('#state').val(val);
            var state = $('#state').val();
            obj['state'] = val;
          }
          if (addressType == 'country') {
            $('#country').val(val);
            var city = $('#country').val();
            obj['country'] = val;
          }
          if (addressType == 'postal_code') {
            var code: any;
            if (val == null) {
              obj['zip_code'] = 0;
              code = 0;
            } else {
              $('#zip_code').val(val);
              code = $('#zip_code').val();
              obj['zip_code'] = val;
            }
          }
        }

        ////console.log(obj);
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
            obj['latitude'] = results[0].geometry.location.lat();
            obj['longitude'] = results[0].geometry.location.lng();
            //localStorage.setItem('l', JSON.stringify(obj));
            // $('#latitude').val(latitude_search);
            // $('#longitude').val(longitude_search);
          }
        }
      );
    });
  }

  geocoder: any = new google.maps.Geocoder();
  geocode(request: google.maps.GeocoderRequest): void {
    let obj: any = {};

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
        //console.log(JSON.parse(loc));

        $('#longitude').val(JSON.parse(loc).geometry.location.lng);
        $('#latitude').val(JSON.parse(loc).geometry.location.lat);
        obj['latitude'] = JSON.parse(loc).geometry.location.lat;
        obj['longitude'] = JSON.parse(loc).geometry.location.lng;
        for (var i = 0; i < JSON.parse(loc).address_components.length; i++) {
          const addressType = JSON.parse(loc).address_components[i].types[0];
          //console.log(addressType);

          if (addressType) {
            const val = JSON.parse(loc).address_components[i].long_name;

            if (addressType == 'route') {
              $('#street').val(val);
              // var street = $('#street').val();
              obj['street'] = val;
            }
            if (addressType == 'street_number') {
              $('#street_nb').val(val);
              //  var street_nb = $('#street_nb').val();
              obj['street_nb'] = val;
            }
            if (addressType == 'locality') {
              $('#city').val(val);
              //  var ort = $('#city').val();
              if (val) {
                obj['city'] = val;
              }
            }
            if (addressType == 'administrative_area_level_1') {
              $('#state').val(val);
              //var state = $('#state').val();
              obj['state'] = val;
            }
            if (addressType == 'country') {
              $('#country').val(val);
              //  var city = $('#country').val();
              obj['country'] = val;
            }
            if (addressType == 'postal_code') {
              var code: any;
              if (val == null) {
                obj['zip_code'] = 0;
                code = 0;
              } else {
                $('#zip_code').val(val);
                code = $('#zip_code').val();
                obj['zip_code'] = val;
              }
            }
          }
        }
        localStorage.setItem('l', JSON.stringify(obj));

        //response.innerText = JSON.stringify(result, null, 2);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  }
  //register
  mobile = '';
  password = '';
  isPatient: boolean = true;
  doctors: any = [];
  patients: any = [];
  email = '';
  commercialchecked: boolean = false;
  toschecked: boolean = false;
  firstname = '';
  lastname = '';
  repassword = '';
  loading: boolean = false;
  lat: any;
  city: any;
  combinationarray: any = [];
  commercialid: any;
  bycommercial: boolean = false;
  userphone: string = '';

  register() {
    let params = {
      id: this.doctors.length + 1,
      doctor_name: this.name,
      password: this.password,
    };
    if (this.register_phone) {
      let p = this.getCurrentCodeCountry(this.phoneee);
      let obj: any = this.getPhoneCountryCode2(p);
      this.userphone = this.phoneee.replace(obj.dial_code, '');
    }

    let chosenposition = JSON.parse(localStorage.getItem('l'));
    ////console.log(this.newserviceobject);

    //  localStorage.removeItem('l')
    //console.log(this.newserviceobject);

    this.authserv
      .RegisterPartner(
        this.email,
        this.password,
        this.firstname,
        this.lastname,
        this.iscompany,
        this.bycommercial,
        this.commercialid,
        this.phoneee,
        this.userphone
      )
      .subscribe((res: any) => {
        if (res.registred == true) {
          this.loading = true;
          this.authserv
            .login(this.email ? this.email : this.userphone, this.password)
            .subscribe((data: any) => {
              var tmp: any = data;
              if (!tmp.loggingin) {
                this.toastr.error('', tmp.message);
              } else {
                if (tmp.is_active == false) {
                  localStorage.setItem('main', JSON.stringify(data));
                  let object = {
                    accessToken: tmp.accessToken,
                    rest_id: tmp.id,
                    session_key: tmp.session_key,
                    full_name: tmp.first_name + ' ' + tmp.last_name,
                  };
                  localStorage.setItem('rest', JSON.stringify(object));
                  localStorage.setItem('switched', String(0));
                  let currentUrl = this.router.url;
                  if (this.selectedfieldofbuiseness.length > 0) {
                    let datap: any = {
                      user_id: tmp.id,
                    };
                    this.compser
                      .getCompanyUser(datap)
                      .subscribe((companyregistred: any) => {
                        const splitCompanyName = this.compnamee.replace(
                          /[^A-Z0-9]+/gi,
                          '.'
                        );
                        const splitedCompany =
                          splitCompanyName.toLowerCase() +
                          '.' +
                          tmp.id +
                          '' +
                          Math.floor(100 + Math.random() * 900);
                        tmp.username = splitedCompany;

                        ////console.log(companyregistred);
                        var result = this.combinationarray.flatMap((v, i) =>
                          this.combinationarray
                            .slice(i + 1)
                            .map((w) => v + ' ' + w)
                        );
                        const splitCompanyName2 = this.compnamee.replace(
                          /[^A-Z0-9]+/gi,
                          '.'
                        );
                        const splitedCompany2 =
                          splitCompanyName2.toLowerCase() +
                          '.' +
                          companyregistred.id;

                        let objectCompany = {
                          id: companyregistred.id,
                          city: chosenposition['city'], //this.cityLocation,
                          zip_code: chosenposition['zip_code'], //this.zipCodeLocation,
                          country: chosenposition['country'],
                          state: chosenposition['state'],
                          longitude: chosenposition['longitude'], //this.longitudeLocation,
                          latitude: chosenposition['latitude'],
                          show_card: true,
                          show_email: false,
                          show_website: false,
                          company_name: this.compnamee,
                          is_agency: this.companyobject.is_agency,
                          show_phone: true,
                          registation_complete: true,
                          mainCategoryId: this.selectedcategory
                            ? this.selectedcategory.id
                            : null,
                          hashtags: JSON.parse(companyregistred.hashtags),
                          company_link: splitedCompany2,
                          socials: JSON.parse(companyregistred.socials),
                        };

                        let obj = {
                          distance: 0, //this.distance,
                          companyId: companyregistred.id,
                          title: '',
                          city: chosenposition['city'], //this.cityLocation,
                          zip_code: chosenposition['zip_code'], //this.zipCodeLocation,
                          country: chosenposition['country'],
                          state: chosenposition['state'],
                          longitude: chosenposition['longitude'], //this.longitudeLocation,
                          latitude: chosenposition['latitude'], //this.latitudeLocation,
                          is_active: 1,
                          company_name: this.compnamee,
                          services: [],
                        };
                        this.companyService
                          .updateCompany(objectCompany)
                          .subscribe((e) => {
                            this.compser
                              .addcommcompcontract(this.commercialid, tmp)
                              .subscribe((comfeed) => {});
                            this.companyService
                              .addLocation(obj)
                              .subscribe((data) => {
                                let idfields: any[] = [];
                                this.selectedfieldofbuiseness.forEach((e) => {
                                  idfields.push(e.id);
                                });
                                let locationObj = {
                                  id: data.data.id,
                                  services: idfields,
                                  still_do: 1,
                                };
                                ////console.log(locationObj);
                                this.companyService
                                  .updateLocationServices(locationObj)
                                  .subscribe((data) => {
                                    this.compser
                                      .addkeywordsautoforcompany(
                                        result,
                                        companyregistred.id,
                                        'company',
                                        objectCompany
                                      )
                                      .subscribe((e) => {
                                        this.router
                                          .navigateByUrl(
                                            '/account_verification'
                                          )
                                          .then(() => {
                                            window.location.reload();
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  } else {
                    let p: string = '';
                    let datap: any = {
                      user_id: tmp.id,
                      username: p,
                    };
                    this.compser
                      .getCompanyUser(datap)
                      .subscribe((companyregistred: any) => {
                        const splitCompanyName2 = this.compnamee.replace(
                          /[^A-Z0-9]+/gi,
                          '.'
                        );
                        const splitedCompany2 =
                          splitCompanyName2.toLowerCase() +
                          '.' +
                          companyregistred.id;
                        ////console.log(companyregistred);

                        let objectCompany = {
                          id: companyregistred.id,
                          city: chosenposition['city'], //this.cityLocation,
                          zip_code: chosenposition['zip_code'], //this.zipCodeLocation,
                          country: chosenposition['country'],
                          state: chosenposition['state'],
                          longitude: chosenposition['longitude'], //this.longitudeLocation,
                          latitude: chosenposition['latitude'],
                          show_card: false,
                          show_email: false,
                          show_website: false,
                          company_name: this.compnamee,
                          is_agency: this.companyobject.is_agency,
                          show_phone: false,
                          registation_complete: false,
                          mainCategoryId: this.selectedcategory
                            ? this.selectedcategory.id
                            : null,
                          hashtags: JSON.parse(companyregistred.hashtags),
                          company_link: splitedCompany2,
                          socials: JSON.parse(companyregistred.socials),
                        };

                        let obj = {
                          distance: 0, //this.distance,
                          companyId: companyregistred.id,
                          title: '',
                          city: chosenposition['city'], //this.cityLocation,
                          zip_code: chosenposition['zip_code'], //this.zipCodeLocation,
                          country: chosenposition['country'],
                          state: chosenposition['state'],
                          longitude: chosenposition['longitude'], //this.longitudeLocation,
                          latitude: chosenposition['latitude'], //this.latitudeLocation,
                          is_active: 1,

                          services: [],
                        };
                        this.companyService
                          .updateCompany(objectCompany)
                          .subscribe((e) => {
                            let idfields: any[] = [];
                            this.selectedfieldofbuiseness.forEach((e) => {
                              idfields.push(e.id);
                            });
                            const splitCompanyName = this.compnamee.replace(
                              /[^A-Z0-9]+/gi,
                              '.'
                            );
                            const splitedCompany =
                              splitCompanyName.toLowerCase() +
                              '.' +
                              tmp.id +
                              '' +
                              Math.floor(100 + Math.random() * 900);
                            tmp.username = splitedCompany;
                            if (this.bycommercial) {
                              this.compser
                                .addcommcompcontract(this.commercialid, tmp)
                                .subscribe((comfeed) => {});
                            }

                            this.companyService
                              .addLocation(obj)
                              .subscribe((data) => {
                                let locationObj = {
                                  id: data.data.id,
                                  services: idfields,
                                  still_do: 1,
                                };
                                this.newserviceobject.requesterId =
                                  companyregistred.id;
                                this.newserviceobject.locationId = data.data.id;

                                this.categservies
                                  .suggestcategory(this.newserviceobject)
                                  .subscribe((data) => {
                                    if (data.success == true) {
                                      this.router
                                        .navigateByUrl('/account_verification')
                                        .then(() => {
                                          window.location.reload();
                                        });
                                    }
                                  });
                              });
                          });
                      });
                  }
                } else {
                  localStorage.setItem('main', JSON.stringify(data));

                  //////console.log(data);
                  let object = {
                    accessToken: tmp.accessToken,
                    rest_id: tmp.id,
                    session_key: tmp.session_key,
                    full_name: tmp.first_name + ' ' + tmp.last_name,
                  };
                  localStorage.setItem('rest', JSON.stringify(object));
                  localStorage.setItem('switched', String(0));

                  if (tmp.roles[0] == 'ROLE_ADMIN') {
                    this.router.navigateByUrl('/admin/dashboard').then(() => {
                      window.location.reload();
                    });
                  } else {
                    if (tmp.roles[0] == 'ROLE_COMMERCIAL') {
                      this.coomser
                        .getcommercialbyid(tmp.id)
                        .subscribe((datac: {}) => {
                          let object = {
                            accessToken: tmp.accessToken,
                            rest_id: tmp.id,
                            session_key: tmp.session_key,
                            full_name: tmp.first_name + ' ' + tmp.last_name,
                          };
                          localStorage.setItem('main', JSON.stringify(datac));
                          localStorage.setItem('rest', JSON.stringify(object));
                          localStorage.setItem('switched', String(0));
                          this.router
                            .navigateByUrl('/commercial/dashboard')
                            .then(() => {
                              window.location.reload();
                            });
                        });
                    } else {
                      this.router.navigateByUrl('/').then(() => {
                        window.location.reload();
                      });
                    }
                  }
                }
              }
            });
        } else {
          this.loading = false;
          this.toastr.error('', res.message);
        }
      });
  }

  async signup() {
    if (
      this.firstname === '' ||
      this.lastname === '' ||
      this.email === '' ||
      this.password === ''
    ) {
      this.toastr.error('', this.fieldRequired[this.serviceLang]);
    } else {
      let mailpart1 = this.email.split('@');

      if (
        !this.firstname.includes('tandu') &&
        !this.lastname.includes('tandu') &&
        !mailpart1[0].includes('tandu')
      ) {
        if (this.mailvalid) {
          if (this.password === this.repassword) {
            if (this.toschecked) {
              if (this.commercialchecked) {
                const inputValue = '';

                const { value: ipAddress } = await Swal.fire({
                  title: this.commercialSection.title[this.serviceLang],
                  input: 'text',
                  inputLabel: 'code',
                  inputValue: inputValue,
                  showCancelButton: true,
                  cancelButtonText:
                    this.commercialSection.btnClose[this.serviceLang],
                  confirmButtonText:
                    this.commercialSection.btnConfirm[this.serviceLang],
                  inputValidator: (value) => {
                    if (!value) {
                      return this.commercialSection.errorsLang[
                        this.serviceLang
                      ];
                    } else {
                      this.commserv
                        .getcommercialbycode(value)
                        .subscribe((datacom: any) => {
                          if (datacom) {
                            this.commercialid = datacom.id;
                            this.bycommercial = true;
                            this.register();
                          }
                        });
                    }
                  },
                });
              } else {
                this.register();
              }
            } else {
              this.loading = false;
              this.toastr.error(
                '',
                this.commercialSection.tos[this.serviceLang]
              );
            }
          } else {
            this.loading = false;
            this.toastr.error(
              '',
              this.commercialSection.password[this.serviceLang]
            );
          }
        } else {
          this.loading = false;
          this.toastr.error('', this.commercialSection.eamil[this.serviceLang]);
        }
      } else {
        this.loading = false;
        this.toastr.error('', this.messageErrorEm2[this.serviceLang]);
      }
    }
  }

  async signupphone() {
    if (
      this.firstname === '' ||
      this.lastname === '' ||
      this.phoneee === '' ||
      this.password === ''
    ) {
      this.toastr.error('', this.fieldRequired[this.serviceLang]);
    } else {
      let mailpart1 = this.email.split('@');

      if (this.password === this.repassword) {
        if (this.toschecked) {
          if (this.commercialchecked) {
            const inputValue = '';

            const { value: ipAddress } = await Swal.fire({
              title: this.commercialSection.title[this.serviceLang],
              input: 'text',
              inputLabel: 'code',
              inputValue: inputValue,
              showCancelButton: true,
              cancelButtonText:
                this.commercialSection.btnClose[this.serviceLang],
              confirmButtonText:
                this.commercialSection.btnConfirm[this.serviceLang],
              inputValidator: (value) => {
                if (!value) {
                  return this.commercialSection.errorsLang[this.serviceLang];
                } else {
                  this.commserv
                    .getcommercialbycode(value)
                    .subscribe((datacom: any) => {
                      if (datacom) {
                        this.commercialid = datacom.id;
                        this.bycommercial = true;
                        this.register();
                      }
                    });
                }
              },
            });
          } else {
            this.register();
          }
        } else {
          this.loading = false;
          this.toastr.error('', this.commercialSection.tos[this.serviceLang]);
        }
      } else {
        this.loading = false;
        this.toastr.error(
          '',
          this.commercialSection.password[this.serviceLang]
        );
      }
    }
  }
  mailvalid: boolean = true;
  checkifmail() {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.mailvalid = regularExpression.test(String(this.email).toLowerCase());
  }
  gotoone() {
    this.showone = true;
    this.showfour = false;
    this.showthree = false;
    this.showtwo = false;
  }
  gototwo() {
    this.showone = false;
    this.showfour = false;
    this.showthree = false;
    this.showtwo = true;
  }
  gotothree() {
    this.showone = false;
    this.showfour = false;
    this.showthree = true;
    this.showtwo = false;
  }
  chooseservices: any = {
    languages: {
      name_en: 'Identify your field of business ! ',
      name_fr: "Identifiez votre domaine d'activité !",
      name_de: 'Ihren Geschäftsbereich identifizieren !',
    },
  };
  chosenones: any = {
    languages: {
      name_en: 'Chosen business fields  ! ',
      name_fr: "Domaines d'activité choisis !",
      name_de: 'Ausgewählte Geschäftsfelder !',
    },
  };
  enter: any = {
    languages: {
      name_en:
        'Enter one or more terms that best describe your business! (e.g. “Auto Mechanic”, “Baby Sitter”) ',
      name_fr:
        'Entrez un ou plusieurs termes qui décrivent le mieux votre entreprise !(par exemple “Mécanicien automobile”, “Baby Sitter”) ',
      name_de:
        'Geben Sie ein oder mehrere Begriffe ein, welche Ihr Geschäft am ehesten beschreiben!  (z.B. “Auto Mechaniker”, “Baby Sitter”)',
    },
  };
  fieldRequired: any = {
    name_en: 'Please enter mandatory fields!',
    name_fr: 'Veuillez remplir les champs obligatoires !',
    name_de: 'Bitte Pflichtfelder ausfüllen!',
  };
  messageErrorEm2: any = {
    name_en:
      'The word (Tanduu ) is not allowed to be used in any personal information',
    name_fr:
      "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
    name_de:
      'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
  };
  commercialSection: any = {
    title: {
      name_en: 'Enter Commercial code',
      name_fr: 'Entrez le code du commercial',
      name_de: 'Handelscode eingeben',
    },
    errorsLang: {
      name_en: 'You need to write something!',
      name_fr: 'Vous devez écrire quelque chose!',
      name_de: 'Sie müssen etwas schreiben!',
    },
    password: {
      name_en: 'Confirm password!',
      name_fr: 'Confirmez le mot de passe!',
      name_de: 'Bestätige das Passwort!',
    },
    email: {
      name_en: 'Email format is invalid!',
      name_fr: "Le format d'e-mail n'est pas valide!",
      name_de: 'E-Mail-Format ist ungültig!',
    },
    tos: {
      name_en: 'TOS must be accepted!',
      name_fr: 'Les CGU doivent être acceptées!',
      name_de: 'AGB müssen akzeptiert werden!',
    },
    btnClose: {
      name_en: 'Cancel',
      name_fr: 'Annuler',
      name_de: 'abbrechen',
    },
    btnConfirm: {
      name_en: 'Confirm',
      name_fr: 'Confirmer',
      name_de: 'Bestätigen',
    },
  };
  itseemslike: any = {
    languages: {
      name_en: 'It seems like your field of business is',
      name_fr: "Il semble que votre domaine d'activité soit",
      name_de: 'Es scheint, als wäre Ihr Geschäftsfeld ',
    },
  };
  jomla: any = {
    languages: {
      name_en:
        "You can choose more services from the business areas shown below . D'ont worry you can add more services and work industries in your profile settings later ",
      name_fr:
        "Vous pouvez choisir d'autres services dans les domaines d'activité indiqués ci-dessous . Ne vous inquiétez pas, vous pouvez ajouter plus de services et d'industries de travail dans les paramètres de votre profil plus tard ",
      name_de:
        'Sie können weitere Dienstleistungen aus den unten aufgeführten Geschäftsbereichen auswählen. Keine Sorge, Sie können später weitere Dienstleistungen und Arbeitsbranchen in Ihren Profileinstellungen hinzufügen ',
    },
  };
  itsnot: any = {
    languages: {
      name_en: "it's not your field of business? go back and choose another ",
      name_fr:
        "ce n'est pas votre domaine d'activité ? revenir en arrière et en choisir un autre",
      name_de:
        'Es ist nicht Ihr Geschäftsfeld? gehen Sie zurück und wählen Sie einen anderen',
    },
  };

  //socket
  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  filterItems(arr: any, query: any) {
    return arr.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  Allserviceslist: any[] = [];
  result_search: any[] = [];
  newArr: any[] = [];
  searchSeletedService: any;
  socket: any;
  showSuggestion: boolean = false;
  searchServices(value: any) {
    this.showlooking = true;
    this.showSuggestion = true;
    this.searchServiceWebHeader1 = value;
    this.sendjoinreq(value);
  }
  sendjoinreq(txt: string) {
    this.socket.emit('service-type', {
      message: txt,
    });
  }
  results: any[] = [];
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, { secure: true });

    this.socket.on('connection', (data: string) => {
      if (data) {
      }
    });

    this.socket.on('message-from-services-server', (data: any) => {
      this.showlooking = false;
      this.results = [];
      this.other = [];

      let arrresults: any[] = data.text;

      this.results = Object.values(
        arrresults.reduce(
          (acc, cur) => Object.assign(acc, { [cur.service]: cur }),
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
      if (this.results.length == 0) {
        let o: any = {
          text: this.noAvailableData.service2[this.serviceLang],
          id: null,
        };
        this.other[0] = o;
      } else {
        this.results.forEach((res) => {
          let obj: any = {
            text: res[this.serviceLang],
            textcat: res['cat' + this.serviceLang],
            id: res.service,
          };
          this.other.push(obj);
        });
      }
    });
  }

  other: any[] = [];
  searchServiceWebHeader1: any;
  Finaleselectedservice: any;
  selectService(id: any, name: any, item: any) {
    //localStorage.setItem("serviceId", id);

    this.Finaleselectedservice = item;
    this.searchSeletedService = id;
    this.sendjoinreq(name);
    $('#search-service').val(name);

    this.showSuggestion = true;
  }
  noAvailableData: any = {
    branch: {
      name_en: 'No branchs found',
      name_fr: 'Aucune branches trouvée',
      name_de: 'Keine Filiale gefunden',
    },
    category: {
      name_en: 'No categories found',
      name_fr: 'Aucune categories trouvée',
      name_de: 'Keine Kategorien gefunden',
    },
    service: {
      name_en: 'No services found',
      name_fr: 'Aucune services trouvée',
      name_de: 'Keine Dienste gefunden',
    },
    service2: {
      name_en:
        'If you cant find your branch or services you can send us an email by clicking here (it can take from us 72 hours to respond)',
      name_fr:
        'Si vous ne trouvez pas votre agence ou vos services, vous pouvez nous envoyer un e-mail en cliquant ici (cela peut nous prendre 72 heures pour répondre)',
      name_de:
        'Wenn Sie Ihre Filiale oder Ihre Dienstleistungen nicht finden können, können Sie uns eine E-Mail senden, indem Sie hier klicken (es kann 72 Stunden dauern, bis wir antworten).',
    },
    service3: {
      name_en: 'If you cant find your branch or services you can ',
      name_fr:
        'Si vous ne trouvez pas votre agence ou vos services, vous pouvez ',
      name_de:
        'Wenn Sie Ihre Filiale oder Ihre Dienstleistungen nicht finden können, können Sie dies tun',
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
    searchBranch: {
      name_en: 'search a branch',
      name_fr: 'rechercher une branche',
      name_de: 'eine Filiale suchen',
    },
    searchCatgeories: {
      name_en: 'search a category',
      name_fr: 'rechercher une catégorie',
      name_de: 'suchen Sie eine Kategorie',
    },
    searchServices: {
      name_en: 'search a service',
      name_fr: 'rechercher un service',
      name_de: 'einen Dienst suchen',
    },
    selectServices: {
      name_en: 'select a service',
      name_fr: 'selectionnez un service',
      name_de: 'Wählen Sie einen Dienst aus',
    },
  };
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
  register_phone: boolean = false;
  register_mail: boolean = false;
  phoneee: string = '';
  registermail() {
    this.email = '';
    this.phoneee = '';
    this.register_phone = false;
    this.register_mail = true;
  }
  registerphone() {
    this.email = '';
    this.phoneee = '';
    this.register_phone = true;
    this.register_mail = false;
  }
}
