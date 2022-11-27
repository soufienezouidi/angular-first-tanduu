import { ExpressService } from 'src/app/services/tandu-admin/express.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewEncapsulation,
  AfterViewChecked,
  ViewChild,
  HostListener,
  TemplateRef,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CommonServiceService } from '../common-service.service';
import { CompanyService } from '../services/company.service';
import { ShopService } from '../services/shop.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  doctorDetails;
  expandedIndex = 1;
  companyDetails;
  complocations: any[] = [];
  allservices: any[] = [];
  allcategories: any[] = [];
  allProducts: any[] = [];
  allsub_categories: any[] = [];
  userId: any;
  listShopProducts: any[] = [];
  listGalerie: any[] = [];
  currentHotel: any;
  legalinfos: any = {
    name_fr: 'Informations légales',
    name_de: 'Rechtsinformation',
    name_en: 'legal information',
  };
  panelOpenState = false;
  constructor(
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private deviceService: DeviceDetectorService,
    private compser: CompanyService,
    private shopService: ShopService,
    private modalService: BsModalService,
    private expressserv: ExpressService,
    public translate: TranslateService
  ) {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
  }
  getdirect: any = {
    languages: {
      name_en: 'Get directions',
      name_fr: "Afficher l'itinéraire",
      name_de: 'Route anzeigen',
    },
  };
  sendmail: any = {
    languages: {
      name_en: 'Send Mail',
      name_fr: 'Envoyer e-mail',
      name_de: 'E-Mail senden',
    },
  };
  Visitshop: any = {
    languages: {
      name_en: 'Visit shop',
      name_fr: 'Visiter la boutique',
      name_de: 'Shop besuchen',
    },
  };
  overview: any = {
    languages: {
      name_en: 'Overview',
      name_fr: 'A propos',
      name_de: 'Überblick',
    },
  };
  gallery: any = {
    languages: {
      name_en: 'Gallery',
      name_fr: 'Galerie',
      name_de: 'Galerie',
    },
  };
  askser: any = {
    languages: {
      name_en: 'Ask for service',
      name_fr: 'Demander un service',
      name_de: 'Anfrage senden',
    },
  };
  locations: any = {
    languages: {
      name_en: 'Locations',
      name_de: 'Standorte',
      name_fr: 'Localisation',
    },
  };
  reviews: any = {
    languages: {
      name_en: 'Reviews (coming soon)',
      name_fr: 'Avis (à venir)',
      name_de: 'Bewertungen (bald verfügbar)',
    },
  };
  mainser: any = {
    languages: {
      name_en: 'Services and locations',
      name_de: 'Standorte und Dienstleistungen',
      name_fr: 'Services et emplacements',
    },
  };
  sers: any = {
    languages: {
      name_en: 'Industry ',
      name_de: 'Fachgebiet',
      name_fr: 'Industrie',
    },
  };
  subser: any = {
    languages: {
      name_en: 'Field of business',
      name_fr: "Domaine d'activité",
      name_de: 'Geschäftsbereich',
    },
  };
  allser: any = {
    languages: {
      name_en: 'Offered services',
      name_fr: 'Services offerts',
      name_de: 'Angebotene Leistungen',
    },
  };
  about: any = {
    languages: {
      name_en: 'About',
      name_fr: 'A propos de',
      name_de: 'Über',
    },
  };

  currentLanguage: any;
  serviceLang: string;
  companyurl: string;
  companycode: string;
  listkeywords: any[] = [];
  expresses: any[] = [];
  finallistkeywords: any[] = [];
  name: any = {
    name_en: 'Terms and conditions',
    name_fr: 'Termes et conditions',
    name_de: 'Geschäftsbedingungen',
  };

  name2: any = {
    name_en: 'Privacy policy and guidelines',
    name_fr: 'Politique de confidentialité',
    name_de: 'Datenschutzbestimmungen',
  };
  gotopp() {
    window.open('/privacypolicy/' + this.companyDetails.company_link, '_blank');
  }
  gototerms() {
    window.open(
      '/termsandconditions/' + this.companyDetails.company_link,
      '_blank'
    );
  }

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
  isMobile: any;
  descriptionText: any;
  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    window.scrollTo(0, 0);
    this.companyurl = this.route.snapshot.paramMap.get('name');

    this.id = this.route.queryParams.subscribe((params) => {
      ////console.log(params);
      this.expressserv.getexpresslist().subscribe((res) => {
        this.expresses = res;
        this.expresses.forEach((ex: any) => {
          ex.languages = JSON.parse(ex.languages);
        });
      });
      this.compser
        .getcompanybyusername(this.companyurl)
        .subscribe((com: any) => {
          this.companyDetails = com.company;
          this.descriptionText = {
            text: this.companyDetails.description,
            visible: false,
          };
          //console.log(this.companyDetails);
          if (this.companyDetails.category) {
            this.companyDetails.category.languages = JSON.parse(
              this.companyDetails.category.languages
            );
          }
          this.compser
            .getservicekeywords(this.companyDetails.id, 'company')
            .subscribe((serke) => {
              this.listkeywords = JSON.parse(serke.keyword[0].list_words);

              this.listkeywords.forEach((e) => {
                if (!e.is_dafault) {
                  this.finallistkeywords.push(e);
                }
              });
            });

          this.companyDetails.socials = JSON.parse(this.companyDetails.socials);
          this.companyDetails.hashtags = JSON.parse(
            this.companyDetails.hashtags
          );
          this.companyDetails.socials.fb.link =
            'https://' + this.companyDetails.socials.fb.link;

          this.companyDetails.socials.inst.link =
            'https://' + this.companyDetails.socials.inst.link;

          this.companyDetails.socials.lnk.link =
            'https://' + this.companyDetails.socials.lnk.link;
          this.companyDetails.socials.twt.link =
            'https://' + this.companyDetails.socials.twt.link;
          this.companyDetails.website =
            'https://' + this.companyDetails.website;

          this.userId = this.companyDetails.user.id;
          const img = new Image();
          img.src =
            'https://api.aroundorder.com:1337/api/user/' +
            com.id +
            '/profilepic.png';

          if (img.complete) {
          } else {
            img.onload = () => {
              this.companyDetails.imgurl = true;
            };

            img.onerror = () => {
              this.companyDetails.imgurl = false;
            };
          }
          this.getAllProduct(this.companyDetails.id);
          this.getAllGalleries(this.companyDetails.id);
          this.compser
            .getcompanylocationsandservices(this.companyDetails.id)
            .subscribe((comp: any) => {
              ////console.log('com');
              ////console.log(com.locations);
              ////console.log('com');

              this.complocations = comp.locations;
              //console.log(this.complocations);
              this.complocations.forEach((ee) => {
                ee.services = JSON.parse(ee.services);
              });
              comp.locations.forEach((e: any) => {
                let s: any[] = e.services;
                let ex: boolean;
                let exca: boolean;
                s.forEach((ee: any) => {
                  if (ee.service) {
                    ex = this.allsub_categories.some(
                      (ez) => ez.id === ee.service.id
                    );
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

              this.allcategories.forEach((e) => {
                e.languages = JSON.parse(e.languages);
              });
              this.allservices.forEach((e) => {
                e.languages = JSON.parse(e.languages);
              });
              this.allsub_categories.forEach((e) => {
                e.languages = JSON.parse(e.languages);
              });
            });
        });
    });

    $('img[data-enlargeable]')
      .addClass('img-enlargeable')
      .click(function () {
        var src = $(this).attr('src');
        var modal;

        function removeModal() {
          modal.remove();
          $('body').off('keyup.modal-close');
        }
        modal = $('<div>')
          .css({
            background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
            backgroundSize: 'contain',
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: '10000',
            top: '0',
            left: '0',
            cursor: 'zoom-out',
          })
          .click(function () {
            removeModal();
          })
          .appendTo('body');
        //handling ESC
        $('body').on('keyup.modal-close', function (e) {
          if (e.key === 'Escape') {
            removeModal();
          }
        });
      });
  }
  counter(i: number) {
    return new Array(i);
  }
  keyword: any = {
    languages: {
      name_de: 'Stichworte',
      name_fr: 'Mots clés',
      name_en: 'Keywords',
    },
  };

  initMap(): void {}
  slideConfig2 = {
    dots: true,

    infinite: true,
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
  show = false;
  /* get products of companies */
  getAllProduct(id: any) {
    this.shopService.getAllPorduct({ companyId: id }).subscribe((data) => {
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
        //console.log(this.listShopProducts);
        ////console.log(this.listGalerie);
      }
    });
  }

  clinicfeatureOptions = {
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
        items: 3,
      },
      1000: {
        items: 4,
      },
      1300: {
        items: 5,
      },
    },
  };
  GalleriesList: any[] = [];
  getAllGalleries(id: any) {
    var arrGalleries: any[] = [];
    this.shopService.getAllGalleries({ companyId: id }).subscribe((data) => {
      if (data.galleries.length > 0) {
        data.galleries.forEach((element) => {
          arrGalleries.push({
            id: element.id,
            catalog_name: element.catalog_name,
            catalog_link: element.catalog_link,
            is_deleted: 0,
            galleries: JSON.parse(element.galleries),
            cover: JSON.parse(element.galleries)[0].file_name,
          });
        });
        this.GalleriesList = arrGalleries;
      }
    });
  }
  booksliderConfig = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  modalRef: BsModalRef;
  suggservice(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }
  decline() {
    this.modalRef.hide();
  }
  gototop() {
    var element = document.querySelector('#conttab');

    // smooth scroll to element and align it at the bottom
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
  gotoloc() {
    window.scroll(400, 0);
  }
  scrollY$: Observable<number>;

  @HostListener('window:scroll')
  onScroll() {}
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
}
