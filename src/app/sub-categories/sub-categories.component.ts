import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { CategoriesService } from '../services/categories.service';
import { TranslateService } from '@ngx-translate/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogService } from '../services/blog.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriesServices } from '../services/tandu-admin/categories.service';

import Swal from 'sweetalert2';
import { type } from 'os';
import { PagesService } from '../services/tandu-admin/pages.service';
import { DeviceDetectorService } from 'ngx-device-detector';

declare const $: any;

export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
})
export class SubCategoriesComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;
  subclicked: boolean;
  picked: string;
  param: any = 'd';
  titleText: any;

  false;
  specialityList: any = [];
  doctors: any = [];
  slidepage: any;
  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
  keyword = 'name';
  searchDoctor = [];
  servicess: any[];
  chosenservicess: any = [];
  roles: any = JSON.parse(localStorage.getItem('main'));
  chosencategories: any = [];
  public countries = [
    {
      id: 1,
      name: 'Albania',
      img: 'image',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];
  textTilte: any;
  desc_en: any;
  desc_fr: any;
  desc_de: any;
  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    public categservies: CategoriesService,
    public translate: TranslateService,
    public blogservice: BlogService,
    private categoryser: CategoriesServices,
    private pageserv: PagesService,
    private deviceService: DeviceDetectorService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
  }
  modalRef: BsModalRef;
  suggservice(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  currentLanguage: any;

  categ: any;
  sub_id;
  mapz: any[] = [];
  sub_categories: any[];

  checkValue(event: any) {
    if (this.chosenservicess.indexOf(event.id) < 0) {
      this.chosenservicess.push(event.id);
    } else {
      this.chosenservicess.splice(this.chosenservicess.indexOf(event.id), 1);
    }
  }

  checkitem(val: any): boolean {
    if (this.chosenservicess.indexOf(val.id) < 0) {
      return false;
    } else {
      return true;
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
  doyou: any = {
    languages: {
      name_en: 'Do you work in ',
      name_fr: 'Travaillez-vous dans ',
      name_de: 'Arbeitest du in ',
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
  categorysel: any;
  serviceLang: string;
  servicedesc: string;
  categp: any;
  categoryid: any;
  blogss: any[];
  finalblogs: any = [];
  currentcateg: any;
  isAdmin: boolean = false;
  descriptionserv: any;
  showdesc: boolean = false;
  desctoshow: any;
  isMobile: any;
  showMoreText: any = {
    name_en: 'Show more',
    name_fr: 'Montrer plus',
    name_de: 'Zeig mehr',
  };
  showLessText: any = {
    name_en: 'Show less',
    name_fr: 'Montrer moins',
    name_de: 'Zeige weniger',
  };
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();

    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    this.servicedesc = 'description_' + this.currentLanguage;
    if (this.roles && this.roles.roles[0] === 'ROLE_TANDUU_ADMIN') {
      this.isAdmin = true;
    }

    this.categ = this.activatedRoute.snapshot.paramMap.get('id');
    this.categservies.getcategorybyname(this.categ).subscribe((ee: any) => {
      this.currentcateg = ee;
      this.categoryid = ee.id;
      this.pageserv.getdescriptionbycategid(ee.id).subscribe((aze) => {
        if (aze.id) {
          this.descriptionserv = aze;
          this.showdesc = true;
          this.desctoshow = aze[this.currentLanguage];
        }
      });
      this.textTilte = {
        name_en: JSON.parse(ee.languages).name_en,
        name_fr: JSON.parse(ee.languages).name_fr,
        name_de: JSON.parse(ee.languages).name_de,
        is_visible: false,
        description_en: ee.description_en,
        description_fr: ee.description_fr,
        description_de: ee.description_de,
      };
      this.desc_en = ee.description_en;
      this.desc_fr = ee.description_fr;
      this.desc_de = ee.description_de;

      this.categorysel = ee;
      this.categorysel.languages = JSON.parse(this.categorysel.languages);
      var arraySub: any = [];
      this.categservies
        .get_subcategoriesByCategoryid(ee.id)
        .subscribe((subs: any) => {
          subs.forEach((element) => {
            element.languages = JSON.parse(element.languages);
            if (element.is_accepted && !element.is_deleted) {
              arraySub.push(element);
            }
          });

          this.sub_categories = arraySub;
          /*this.sub_categories.push({
            languages: {
              name_en: 'suggest new sub service',
              name_fr: 'suggérer un nouveau sous-service',
              name_de: ' service vorschlagen',
            },
            name: 'suggest new sub service',
            id: 'xbvtyu14569',
          });*/
        });
    });
    this.blogservice.getblogsbycategory(this.categ).subscribe((res) => {
      this.blogss = res.data;

      this.blogss.filter(
        (s: any) => s.languages == localStorage.getItem('language')
      );
      this.blogss.forEach((e: any) => {
        e.author = JSON.parse(e.author);
        if (e.languages === localStorage.getItem('language')) {
          this.finalblogs.push(e);
          this.finalblogs.slice(0, 5);
        }
      });
    });
    window.scrollTo(0, 0);
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
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
  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(
      (state) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slide4 = [
    {
      img: 'assets/img/slide1.jpg',
    },
    {
      img: 'assets/img/slide2.jpg',
    },
  ];

  sendrequest() {
    this.router.navigateByUrl('partners_search');
  }

  slideConfig4 = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig2 = {
    dots: false,
    infinite: false,
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    variableWidth: true,
    arrows: true,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig3 = {
    dots: true,
    arrows: false,
    variableWidth: true,
  };

  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe((res) => {
      this.specialityList = res;
    });
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }

  getblogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }

  selectEvent(item) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl('/patients/doctor-profile?id=' + filter[0].id);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  searchdoctor() {
    this.router.navigate(['/patients/search-doctor']);
  }

  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: false,
    variableWidth: true,
  };
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }

  nextpage() {
    this.slickModal3.slickNext();
  }

  prevpage() {
    this.slickModal3.slickPrev();
  }
  decline() {
    this.modalRef.hide();
  }
  sendprop() {}

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
  blogsOptions = {
    loop: true,
    margin: 15,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left custom-arrow"></i>',
      '<i class="fas fa-chevron-right custom-arrow"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 4,
      },
    },
  };
  getCategorySelected: any;

  openModalDescription(id: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  addDescription() {
    if (!this.desc_en || !this.desc_fr || !this.desc_de) {
      Swal.fire({
        icon: 'warning',
        text: 'Description fields are required',
      });
      return false;
    }
    let categ = {
      id: this.currentcateg.id,
      description_en: this.desc_en,
      description_fr: this.desc_fr,
      description_de: this.desc_de,
    };
    this.categoryser.updatecategory(categ).subscribe((result) => {
      window.location.reload();
    });
  }
  selectedfieldofbuiseness: any[] = [];
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
  show = false;

  items = [
    'Subject 1',
    'Subject 2',
    'Subject 3',
    'Subject 4',
    'Subject 5',
    'Subject 6',
    'Subject 7',
    'Subject 8',
    'Subject 9',
  ];
  itemss = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];
}
