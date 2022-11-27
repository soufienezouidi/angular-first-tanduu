import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { data } from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Lity from 'lity';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import { CompaniesService } from '../services/companies_services/companies.service';
import { ShopService } from '../services/shop_galeries/shop.service';
declare var $: any;

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css'],
})
export class GalleriesComponent implements OnInit {
  currentLanguage: any;
  serviceLang: any;
  addGallery: any = {
    name_en: 'Add new catalog',
    name_fr: 'Ajouter un nouveau catalogue',
    name_de: 'Neuen Katalog hinzufügen',
  };
  addGalleryPic: any = {
    name_en: 'Add new pictures',
    name_fr: 'Ajouter des images',
    name_de: 'Bilder hinzufügen',
  };
  editCatalog: any = {
    name_en: 'Edit catalog',
    name_fr: 'Modifier le catalogue',
    name_de: 'Katalog bearbeiten',
  };
  deleteCatalog: any = {
    name_en: 'Delete catalog',
    name_fr: 'Supprimer le catalogue',
    name_de: 'Katalog löschen',
  };
  companyConnected: any;
  userConnected: any;
  userObject: any = JSON.parse(localStorage.getItem('rest'));
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
  constructor(
    private companyService: CompaniesService,
    private modalService: BsModalService,
    private compser: CompanyService,
    public translate: TranslateService,
    private shopService: ShopService
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
  callEventLit(event: any) {
    console.log(event);
    Lity('https://www.youtube.com/watch?v=HAEvDxG3BV0');
  }
  getUserConnected(id: any) {
    var obj = {
      id: id,
    };
    this.companyService.getUserById(obj).subscribe((user) => {
      this.userConnected = user.message;
    });
  }
  getCompanyConnected(id: any) {
    var obj = {
      user_id: id,
    };
    var locationServices = [];
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
      this.getAllGalleries(company.id);
    });
  }
  GalleriesList: any[] = [];
  placeholderFilter: any = {
    name_en: 'search ',
    name_fr: 'chercher',
    name_de: 'Suche',
  };
  catalogEmpty: any = {
    name_en: 'Catalog is empty',
    name_fr: 'Le catalogue est vide',
    name_de: 'Katalog ist leer',
  };
  GalleryEmpty: any = {
    name_fr: 'Votre galerie est vide ',
    name_en: 'Your gallery is empty',
    name_de: 'Ihre Galerie ist leer',
  };
  catalogNameTitle: any = {
    name_fr: 'Catalogue',
    name_en: 'Catalog',
    name_de: 'Katalog',
  };
  call(d) {
    console.log(d);
  }

  getAllGalleries(id) {
    var arrGalleries: any[] = [];
    this.shopService.getAllGalleries({ companyId: id }).subscribe((data) => {
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
        console.log(this.GalleriesList);
      } else {
        this.GalleriesList = [];
      }
    });
  }
  loadingVisible = false;

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }

  onHidden() {
    this.getAllGalleries(this.companyConnected.id);
  }

  showLoadPanel() {
    this.GalleriesList = [{}];
    this.loadingVisible = true;
  }
  modalRef: BsModalRef;

  urlPictureGallery: any;
  filesMsgs: any;
  idCatalog: any;
  idPicture: any;
  selectedGallery: any;
  selectedPicture: any;
  fileToUpdate: File;

  /* show Modal add galleries */
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
  filesCatalog: File[] = [];
  videosCatalogs: File[] = [];
  PicsCatalogs: File[] = [];
  msgCatalogFile: any;

  onSelectCatatlogFile(event: any) {
    this.filesCatalog = [];
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
    console.log(this.filesCatalog);
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
  classNames: any = 'form-control';
  countCarc: any;

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
          '-company' +
          this.companyConnected.id +
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
    console.log(this.companyConnected.id);
    if (!this.catalogName || this.catalogName.length >= 20) {
      this.classNames = 'form-control is-invalid';
      return false;
    }

    let objGal = {
      catalog_name: this.catalogName,
      catalog_link: this.catalogLink,
      userId: this.userObject.rest_id,
      companyId: this.companyConnected.id,
      is_deleted: 0,
      galleries: arrFilesToPush,
    };

    this.shopService.uploadMultipleAttachment(formData).subscribe((data1) => {
      if (data1.length > 0) {
        this.shopService.createGallery(objGal).subscribe((data) => {
          this.filesCatalog = [];
          this.PicsCatalogs = [];
          this.videosCatalogs = [];
          this.urlPictures = [];
          this.msgCatalogFile = {};
          this.getAllGalleries(this.companyConnected.id);
          setTimeout(() => {
            //this.isLoading = false;
          }, 2000);
        });
      }
    });
    this.closeEditGallery();
  }
  showModalAddGallery(template: TemplateRef<any>) {
    this.countCarc = 0;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  showCarc(event: any) {
    this.countCarc = event.length;
    if (!event) {
      this.classNames = 'form-control is-invalid';
    } else {
      this.classNames = 'form-control';
    }
  }
  openModalEditInfoCatalog(template: TemplateRef<any>, item: any) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.idCatalog = item.id;
    this.catalogName = item.catalog_name;
    this.catalogLink = item.catalog_link;
    this.countCarc = this.catalogName.length;
  }
  textAddFiles: any;
  textAddFilesTitle: any = {
    name_en: 'Upload images and videos',
    name_fr: 'Téléchargez des images et des vidéos',
    name_de: 'Laden Sie Bilder und Videos',
  };

  openModalNewCatalog(template: TemplateRef<any>, item: any) {
    this.catalogName = item.catalog_name;
    this.idCatalog = item.id;
    this.selectedGallery = item;
    this.classNames = 'form-control';

    this.textAddFiles = {
      name_en:
        'Upload images and videos to the ' + this.catalogName + ' catalogue',
      name_fr:
        'Téléchargez des images et des vidéos dans le catalogue ' +
        this.catalogName,
      name_de:
        'Laden Sie Bilder und Videos in den ' +
        this.catalogName +
        '-Katalog hoch',
    };
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: 'static',
      keyboard: false,
    });
    $('#newPicInCatlg').val(item.id);
  }

  addNewGalleryToCatalog() {
    let idCatal = parseInt($('#newPicInCatlg').val());
    var ob = this.GalleriesList.find((el) => el.id === idCatal);
    var arrApp: any = [];
    arrApp = ob.galleries;
    ob.galleries = [];

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
          '-company' +
          this.companyConnected.id +
          '-catalog_' +
          Date.now() +
          i +
          '.' +
          this.filesCatalog[i].name.split('.').pop()
      );
      arrApp.push({
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
      id: idCatal,
      galleries: arrApp,
    };
    this.shopService.uploadMultipleAttachment(formData).subscribe((data1) => {
      this.shopService.updateGallery(objGal).subscribe((data) => {
        console.log(data);
        this.filesCatalog = [];
        this.PicsCatalogs = [];
        this.videosCatalogs = [];
        this.urlPictures = [];
        this.msgCatalogFile = {};
        if (data.success) {
          this.getAllGalleries(this.companyConnected.id);
        }
      });
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
  confirmEditGalleryInfo() {
    let obj = {
      id: this.idCatalog,
      catalog_name: this.catalogName,
      catalog_link: this.catalogLink,
    };
    console.log(obj);
    if (!this.catalogName) {
      this.classNames = 'form-control is-invalid';
      return false;
    }

    this.shopService.updateGallery(obj).subscribe((data) => {
      this.filesCatalog = [];
      this.PicsCatalogs = [];
      this.videosCatalogs = [];
      this.urlPictures = [];
      this.msgCatalogFile = {};
      this.getAllGalleries(this.companyConnected.id);
    });
    this.closeEditGallery();
  }
  confirmEditGallery() {
    //////// // // ////conslog(this.idCatalog);
    //////// // // ////conslog(this.idPicture);
    //this.isLoading = true;
    var arrApp: any = [];
    let idPic = parseInt($('#catalogPicId').val());
    let idCatg = parseInt($('#catalogId').val());
    var ctg = this.GalleriesList.find((el) => el.id === idCatg);
    var arrApp = ctg.galleries;
    var pic = ctg.galleries.find((el) => el.id === idPic);

    if (!this.filesCatalog[0]) {
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
    ctg.galleries = [];

    pic.file_name =
      'catalog_' +
      Date.now() +
      '.' +
      this.filesCatalog[0].name.split('.').pop();
    pic.type = this.checkIsVideo(this.filesCatalog[0]) ? 'video' : 'image';

    const formData = new FormData();
    formData.append(
      'files',
      this.filesCatalog[0],
      'user' +
        this.userObject.rest_id +
        '-company' +
        this.companyConnected.id +
        '-catalog_' +
        Date.now() +
        '.' +
        this.filesCatalog[0].name.split('.').pop()
    );

    this.shopService.uploadMultipleAttachment(formData).subscribe((data1) => {
      let obj = {
        id: idCatg,
        galleries: arrApp,
      };

      this.shopService.updateGallery(obj).subscribe((data) => {
        this.filesCatalog = [];
        this.PicsCatalogs = [];
        this.videosCatalogs = [];
        this.urlPictures = [];
        this.msgCatalogFile = {};
        this.getAllGalleries(this.companyConnected.id);
      });
    });

    this.closeEditGallery();
  }
  textDeleteCatalog: any;
  openModalDeleteAllCatalog(template: TemplateRef<any>, item: any) {
    console.log(item);

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
    $('#deletePicFromCatg').val(item1.id);
    $('#deleteCatgId').val(item.id);
  }
  closeDeleteProduct() {
    localStorage.removeItem('productId');
    this.modalRef.hide();
  }
  confirmDeletePictureFromCatalog() {
    //this.isLoading = true;
    //////// // // ////conslog(this.selectedGallery);
    let idPic = parseInt($('#deletePicFromCatg').val());
    let idCatg = parseInt($('#deleteCatgId').val());
    console.log(idPic);
    console.log(idCatg);
    var catalog = this.GalleriesList.find((e) => e.id === idCatg);
    console.log('catalog');
    console.log(catalog);
    var pic = catalog.galleries.findIndex((e) => e.id === idPic);
    console.log('pic');
    console.log(pic);

    catalog.galleries.splice(pic, 1);

    this.shopService
      .updateGallery({
        id: idCatg,
        galleries: catalog.galleries,
      })
      .subscribe((data) => {
        setTimeout(() => {
          this.getAllGalleries(this.companyConnected.id);
        }, 500);
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
      this.getAllGalleries(this.companyConnected.id);

      setTimeout(() => {
        //this.isLoading = false;
      }, 2000);
    });
    this.closeEditGallery();
  }
  closeEditGallery() {
    this.modalRef.hide();
    this.classNames = 'form-control';
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
    }, 500);
    $('#files').replaceWith($('#files').val('').clone(true));
    $('#file').replaceWith($('#file').val('').clone(true));
  }
  isMobile: boolean;
  deviceType: any;

  /* END GALLERY */
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
}
