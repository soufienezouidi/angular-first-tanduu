import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private compser: CompanyService,
    private shopService: ShopService
  ) {}
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

  listGalerie: any[] = [];
  userId: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.compser.getcompanybyid(params.id).subscribe((com: any) => {
        this.companyDetails = com;

        this.userId = com.user.id;
        this.getAllProduct(com.id);

        this.companyDetails.hashtags = JSON.parse(this.companyDetails.hashtags);
      });
    });
  }

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
        this.listShopProducts1 = this.listShopProducts.slice(0, 12);
        this.listGalerie = arrayGalerie;
        this.allProducts = allProducts;
        //console.log(this.listShopProducts);
        //console.log(this.listGalerie);
      }
    });
  }
  counter(i: number) {
    return new Array(i);
  }

  isless: boolean = true;
  showmore() {
    this.isless = false;
    this.listShopProducts1 = this.listShopProducts;
  }
  showless() {
    this.isless = true;
    this.listShopProducts1 = this.listShopProducts.slice(0, 12);
  }
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
}
