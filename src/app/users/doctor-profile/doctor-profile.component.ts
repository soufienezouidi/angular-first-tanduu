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
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './../../services/company.service';
import { ShopService } from './../../services/shop.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
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
  constructor(
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private compser: CompanyService,
    private shopService: ShopService,
    private modalService: BsModalService
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
      name_fr: 'A propos',
      name_de: 'Über',
    },
  };

  currentLanguage: any;
  serviceLang: string;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.queryParams.subscribe((params) => {
      //console.log(params);

      this.compser.getcompanybyid(params.chk4).subscribe((com: any) => {
        this.companyDetails = com;
      
        this.companyDetails.socials = JSON.parse(this.companyDetails.socials);
        this.companyDetails.socials.fb.link =
          'https://' + this.companyDetails.socials.fb.link;

        this.companyDetails.socials.inst.link =
          'https://' + this.companyDetails.socials.inst.link;

        this.companyDetails.socials.lnk.link =
          'https://' + this.companyDetails.socials.lnk.link;

        this.companyDetails.socials.twt.link =
          'https://' + this.companyDetails.socials.twt.link;
          this.companyDetails.category.languages = JSON.parse(this.companyDetails.category.languages)
        this.userId = com.user.id;
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
        this.getAllProduct(com.user.id);
        this.getAllGalleries(com.user.id);

        this.companyDetails.hashtags = JSON.parse(this.companyDetails.hashtags);
      });
      this.compser
        .getcompanylocationsandservices(params.chk4)
        .subscribe((com: any) => {
          //console.log('com');
          //console.log(com.locations);
          //console.log('com');
          this.complocations = com.locations;

          this.complocations.forEach((ee) => {
            ee.services = JSON.parse(ee.services);
          });
          com.locations.forEach((e: any) => {
            let s: any[] = e.services;
            s.forEach((ee: any) => {
              let ex: boolean = this.allservices.some(
                (ez) => ez.id === ee.service.id
              );
              let exca: boolean = this.allcategories.some(
                (ez) => ez.id === ee.service.sub_category.category.id
              );
              let exsub: boolean = this.allsub_categories.some(
                (ez) => ez.id === ee.service.sub_category.id
              );
              if (!ex) {
                this.allservices.push(ee.service);
              }
              if (!exca) {
                this.allcategories.push(ee.service.sub_category.category);
              }
              if (!exsub) {
                this.allsub_categories.push(ee.service.sub_category);
              }
            });
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
  initMap(): void {}

  /* get products of companies */
  getAllProduct(id: any) {
    this.shopService.getAllPorduct({ userId: id }).subscribe((data) => {
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
        //console.log(this.listGalerie);
      }
    });
  }

  GalleriesList: any[] = [];
  getAllGalleries(id: any) {
    var arrGalleries: any[] = [];
    this.shopService.getAllGalleries({ userId: id }).subscribe((data) => {
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
