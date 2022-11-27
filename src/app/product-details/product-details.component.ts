import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private compser: CompanyService,
    private shopService: ShopService
  ) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  id: any;
  companyDetails: any;
  complocations: any[] = [];
  allservices: any[] = [];
  allcategories: any[] = [];
  allProducts: any[] = [];
  allsub_categories: any[] = [];
  listShopProducts: any[] = [];
  listShopProducts1: any[] = [];
  listShopProducts2: any[] = [];
  productdid: any;
  listGalerie: any[] = [];
  current_prd: any;
  userId: any;
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.route.queryParams.subscribe((params) => {
      this.productdid = params.prd;
      this.compser.getcompanybyid(params.shp).subscribe((com: any) => {
        this.companyDetails = com;

        this.userId = com.user.id;
        this.getAllProduct(com.id);

        this.companyDetails.hashtags = JSON.parse(this.companyDetails.hashtags);
      });
    });
  }

  /* get products of companies */
  getAllProduct(id: any) {
    this.route.queryParams.subscribe((params) => {
      this.shopService.getAllPorduct({ companyId: id }).subscribe((data) => {
        var arrayProducts: any = [];
        var arrayGalerie: any = [];
        var allProducts: any = [];
        if (JSON.parse(data.products.products).length > 0) {
          JSON.parse(data.products.products).forEach((element) => {
            if (
              !element.is_deleted &&
              element.is_shop &&
              element.id == params.prd
            ) {
              this.current_prd = element;
            }
            allProducts.push(element);
            if (!element.is_deleted && element.is_shop) {
              arrayProducts.push(element);
            } else if (!element.is_deleted && !element.is_shop) {
              arrayGalerie.push(element);
            } else {
            }
          });
          this.listShopProducts = arrayProducts;
          var found = arrayProducts.filter(function (item) {
            return item.id === params.prd;
          });

          this.listShopProducts1 = this.listShopProducts.slice(0, 6);
          this.listGalerie = arrayGalerie;
          this.allProducts = allProducts;
          //console.log(this.listShopProducts);
          //console.log(this.listGalerie);
        }
      });
    });
  }
  serviceLang: any = 'name_' + localStorage.getItem('language');
  changeproduct(item) {
    this.current_prd = item;
    window.scroll(0, 0);
  }
  websiteText: any = {
    name_en: "This will take you to partner's official shop website",
    name_fr: 'Cela vous mènera au site officiel de la boutique du partenaire',
    name_de: 'Dadurch gelangen Sie zur offiziellen Shop-Website des Partners',
  };
  visit: any = {
    name_en: 'Visit website',
    name_fr: 'Visitez le site Web',
    name_de: 'Besuche die Website',
  };
  outStock: any = {
    name_en: 'No articles available',
    name_fr: 'Aucun article disponible',
    name_de: 'Keine Artikel vorhanden',
  };
  inStock: any = {
    name_en: 'articles available',
    name_fr: 'article disponible',
    name_de: 'artikel vorhanden',
  };
  otherProd: any = {
    name_en: 'Other products',
    name_fr: 'Autres produits',
    name_de: 'Andere Produkte',
  };
}
