import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { ShopService } from '../services/shop_galeries/shop.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { CompaniesService } from '../services/companies_services/companies.service';
declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  language = localStorage.getItem('language');
  userObject: any = JSON.parse(localStorage.getItem('rest'));
  currentLanguage: any;
  userConnected: any;
  companyConnected: any;
  serviceLang: any;
  productName: any;
  productPrice: any;
  countCarc: any = 0;
  productPicture: any;
  productLink: any;
  productArticles: any;
  modalRef: BsModalRef;
  listShopProducts: any[] = [];
  listGalerie: any[] = [];
  allProducts: any[] = [];
  ProductName: any;
  description: any;
  urlPicture: string;
  addnewproduct: any = {
    languages: {
      name_en: 'add product',
      name_fr: 'ajouter un produit',
      name_de: 'Produkt hinzufügen',
    },
  };
  regularNumber: any = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;

  textDeleteProd: { name_en: string; name_fr: string; name_de: string };
  classNames2: string = 'form-control';
  classNames1: string = 'form-control';
  constructor(
    private companyService: CompaniesService,
    private modalService: BsModalService,
    private shopService: ShopService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
  }

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    this.getCompanyConnected(this.userObject.rest_id);
    this.getUserConnected(this.userObject.rest_id);
    this.getDeviceType();
  }
  classNames: any = 'form-control';
  showCarc(event: any) {
    this.countCarc = event.length;
    if (!event) {
      this.classNames = 'form-control is-invalid';
    } else {
      this.classNames = 'form-control';
    }
  }

  showCarc2(event: any) {
    if (!event) {
      this.classNames2 = 'form-control is-invalid';
    } else {
      this.classNames2 = 'form-control';
    }
  }
  showCarc1(event: any) {
    if (!event) {
      this.classNames1 = 'form-control is-invalid';
    } else {
      this.classNames1 = 'form-control';
    }
  }

  /*getAllGalleries() {
    var arrGalleries: any[] = [];
    this.shopService
      .getAllGalleries({ companyId: this.companyConnected.companyId })
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
          conslog(this.GalleriesList);
        } else {
          this.GalleriesList = [];
        }
      });
  }*/
  getUserConnected(rest_id: any) {
    this.companyService.getUserById({ id: rest_id }).subscribe((user) => {
      this.userConnected = user.message;
    });
  }
  getCompanyConnected(rest_id: any) {
    this.companyService
      .getCompanyUser({ user_id: rest_id })
      .subscribe((company) => {
        this.companyConnected = company;

        this.shopService
          .getAllPorduct({ companyId: this.companyConnected.id })
          .subscribe((data) => {
            var arrayProducts: any = [];
            var arrayGalerie: any = [];
            var allProducts: any = [];
            if (JSON.parse(data.products.products).length > 0) {
              JSON.parse(data.products.products).forEach((element) => {
                if (!element.is_deleted && element.is_shop) {
                  allProducts.push(element);
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
          });
      });
  }
  /* PRODUCT API */
  filesProducts: File[] = [];
  msgProductFile: any;
  ProductLinkTitle: any = {
    name_en: 'Product link to your product (on your website)',
    name_fr: 'Lien vers votre produit (sur votre site Web)',
    name_de: 'Produkt-Link zu ihrem Product (auf ihrer Website)',
  };
  isLoadPanelVisible: boolean = false;
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

    if (!this.productName) {
      this.classNames2 = 'form-control is-invalid';
      return false;
    }
    if (!this.productPrice) {
      this.classNames1 = 'form-control is-invalid';
      return false;
    }
    if (!this.description) {
      this.classNames = 'form-control is-invalid';
      return false;
    }

    if (this.filesProducts.length === 0) {
      this.msgProductFile = {
        name_en: 'Please add a picture of your product',
        name_fr: 'Veuillez ajouter une photo de votre produit',
        name_de: 'Bitte fügen Sie ein Bild Ihres Produkts hinzu',
      };
      return false;
    }

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
    const formData = new FormData();
    formData.append(
      'file',
      this.filesProducts[0],
      'user' +
        this.userObject.rest_id +
        '-company' +
        this.companyConnected.id +
        '-product' +
        arrayProduct.length +
        1 +
        '.png'
    );
    this.listShopProducts = [];

    this.shopService.uploadAttachment(formData).subscribe((data1) => {
      var product: any = {
        id: arrayProduct.length + 1,
        name: this.productName,
        price: this.productPrice,
        is_shop: 1,
        picture_name: 'product' + arrayProduct.length + 1 + '.png',
        is_deleted: 0,
        product_link: this.productLink,
        description: this.description,
        articles: this.productArticles,
      };
      arrayProduct.push(product);
      this.shopService
        .updateProduct({
          companyId: this.companyConnected.id,
          products: arrayProduct,
        })
        .subscribe((data) => {
          this.getCompanyConnected(this.userObject.rest_id);
          this.closeEditProduct();
          this.filesProducts = [];
          this.msgProductFile = {};
        });
    });
  }
  showModalAddProduct(template: TemplateRef<any>) {
    this.countCarc = 0;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  NoProduct: any = {
    name_en: 'No product found',
    name_fr: 'Auccun produit trouvé',
    name_de: 'Kein Produkt gefunden',
  };

  openEditProduct(template: TemplateRef<any>, item: any) {
    //localStorage.setItem('productId', item.id);
    this.countCarc = item.description.length;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.ProductName = item.name;
    this.productPrice = item.price;
    this.productArticles = item.articles;
    this.productLink = item.product_link;
    this.description = item.description;
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
    console.log(this.ProductName);
    if (!this.ProductName) {
      this.classNames2 = 'form-control is-invalid';
      return false;
    }
    if (!this.productPrice) {
      this.classNames1 = 'form-control is-invalid';
      return false;
    }
    if (!this.description) {
      this.classNames = 'form-control is-invalid';
      return false;
    }

    if (this.filesProducts.length === 0) {
      this.msgProductFile = {
        name_en: 'Please add a picture of your product',
        name_fr: 'Veuillez ajouter une photo de votre produit',
        name_de: 'Bitte fügen Sie ein Bild Ihres Produkts hinzu',
      };
      return false;
    }
    let arrayProd = this.listShopProducts;
    var indexOf = arrayProd.findIndex((element) => element.id === parseInt(id));
    arrayProd[indexOf].name = this.ProductName;
    arrayProd[indexOf].price = this.productPrice;
    arrayProd[indexOf].product_link = this.productLink;
    arrayProd[indexOf].articles = this.productArticles;
    arrayProd[indexOf].description = this.description;

    if (this.filesProducts[0]) {
      pic = Date.now() + '.png';
      arrayProd[indexOf].picture_name = pic;
      const formData = new FormData();
      formData.append(
        'file',
        this.filesProducts[0],
        'user' +
          this.userObject.rest_id +
          '-company' +
          this.companyConnected.id +
          '-' +
          pic
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
      this.listShopProducts = [];
      this.shopService.uploadAttachment(formData).subscribe((data1) => {
        let prod = {
          companyId: this.companyConnected.id,
          products: arrayProd,
        };

        this.shopService.updateProduct(prod).subscribe((data) => {
          this.getCompanyConnected(this.userObject.rest_id);
          this.closeEditProduct();
          this.filesProducts = [];
          this.msgProductFile = {};
        });
      });
    }
  }
  deviceType: any;
  isMobile: boolean = false;
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
      this.description = '';
      this.countCarc = 0;
      this.classNames = 'form-control';
      $('#picture_product').val(null);
    }, 500);
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
      companyId: this.companyConnected.id,
      products: arrayProduct,
    };
    this.shopService.updateProduct(productId).subscribe((data) => {
      this.getCompanyConnected(this.userObject.rest_id);
    });
    this.closeDeleteProduct();
  }
  getDescription(rowData) {
    return rowData.name + '\n' + rowData.articles;
  }
  searchPanel: any = {
    name_en: 'search',
    name_fr: 'chercher',
    name_de: 'suche',
  };
  tableColumn: any = {
    col1: {
      name_en: 'Description',
      name_fr: 'Description',
      name_de: 'Bezeichnung',
    },
    col2: {
      name_en: 'Product',
      name_fr: 'Produit',
      name_de: 'Produkt',
    },
    articles: {
      name_en: 'Number of items',
      name_fr: 'Nombre des articles',
      name_de: 'Anzahl der Teile',
    },
    price: {
      name_en: 'Price',
      name_fr: 'Prix',
      name_de: 'Preis',
    },
    link: {
      name_en: 'Link',
      name_fr: 'Lien',
      name_de: 'Link',
    },
  };
  /* DROPZONE */
  labelProduct: any = {
    name_en: 'Add picture of product',
    name_fr: 'Ajouter une photo du produit',
    name_de: 'Produktbild hinzufügen',
  };
}
