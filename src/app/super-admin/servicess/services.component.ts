import { C } from '@angular/cdk/keycodes';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from 'src/app/services/company.service';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name-en',
    'name-fr',
    'name-de',
    'Actions',
  ];
  dataSource = ELEMENT_DATA;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private categser: CategoriesServices,
    private compser: CompanyService,
    public router: Router
  ) {}
  dropdownSettings = {};
  id: number;
  services: any[] = [];
  onTagsChanged(input: any) {
  
  }
  onItemAdded(it) {

    let x = this.keywordstoadd.indexOf(it);
    this.keywordstoadd.splice(x, 1);
    this.keywordstoadd.push(it.value);
  }
  onItemRemoved(it) {

  }
  subcategory : any ;
  category : any
  subcateg : any
  gotosubs(){
    this.router.navigateByUrl('/tanduu-admin/sub-categories?id=' + this.category['id']);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.categser
      .get_servicesBysubcategoriesid(this.id)
      .subscribe((sers: any) => {
        this.services = sers;
        let aa = sers[0].sub_category.category
        this.category = aa
        this.subcateg = sers[0].sub_category
        console.log(aa)
        let p = JSON.parse(sers[0].sub_category.languages)
        this.subcategory = p.name_en 
        this.services.forEach((e: any) => {
          this.categser
            .getservicekeywords(e.id, 'service')
            .subscribe((serke) => {
              if (serke.success) {
                e.havekeywords = true;
              } else {
                e.havekeywords = false;
              }
            });
          e.languages = JSON.parse(e.languages);
          e.sub_category.languages = JSON.parse(e.sub_category.languages);
          e.sub_category.category.languages = JSON.parse(
            e.sub_category.category.languages
          );
        });
      });
  }
  modalRef: BsModalRef;
  sernamefr: string;
  sernameen: string;
  sernamede: string;
  servicetoedit: any;
  decline() {
    this.modalRef.hide();
    this.keywordstoadd = [];
    this.toaddkeywordsservice = null;
  }
  enableserv(s: any) {}
  disableserv(s: any) {}
  editModal(template: TemplateRef<any>, sub: any) {
    this.servicetoedit = sub;

    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }
  toaddkeywordsservice: any;
  keywordstoadd: any[] = [];
  addkeywords(template: TemplateRef<any>, ser: any) {
  

    this.categser.getservicekeywords(ser.id, 'service').subscribe((serke) => {
   

      this.toaddkeywordsservice = ser;
      this.keywordstoadd.push(ser.languages.name_fr);
      this.keywordstoadd.push(ser.languages.name_en);
      this.keywordstoadd.push(ser.languages.name_de);

      this.keywordstoadd.push(ser.sub_category.languages.name_fr);
      this.keywordstoadd.push(ser.sub_category.languages.name_en);
      this.keywordstoadd.push(ser.sub_category.languages.name_de);

      this.keywordstoadd.push(ser.sub_category.category.languages.name_fr);
      this.keywordstoadd.push(ser.sub_category.category.languages.name_en);
      this.keywordstoadd.push(ser.sub_category.category.languages.name_de);
      if (serke.success) {
        serke.keywords.keywords = JSON.parse(serke.keywords.keywords);
        serke.keywords.keywords.forEach((element) => {
          let x: number = this.keywordstoadd.indexOf(element.text);
          if (x == -1) {
            this.keywordstoadd.push(element.text);
          }
        });
      }
    });
 
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }
  updateserinfos() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'service will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categser
          .updateservice(this.servicetoedit)
          .subscribe((element: any) => {
            Swal.fire('Success!', 'service is now updated.', 'success').then(
              (e: any) => {
                window.location.reload();
              }
            );
          });
      }
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }
  addnewservice() {
    Swal.fire({
      title: 'Are you sure ?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var ser: any = {
          name_fr: this.sernamefr,
          name_en: this.sernameen,
          name_de: this.sernamede,
          sub_id: this.id,
        };
        this.categser.addservicetosub(ser).subscribe((el: any) => {
          Swal.fire(
            'Perfect!',
            'new services has been added .',
            'success'
          ).then((e: any) => {
            window.location.reload();
          });
        });
      }
    });
  }
  disablservice(a: any) {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        var categ: any = {
          id: a.id,
          is_deleted: true,
        };
        this.categser.enabledisableservice(categ).subscribe((result) => {
          Swal.fire({
            icon: 'success',
            title: 'Category is disabled now',
          }).then((result) => {
            window.location.reload();
          });
        });
      }
    });
  }
  enableservice(a: any) {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        var categ: any = {
          id: a.id,
          is_deleted: 0,
        };
        this.categser.enabledisableservice(categ).subscribe((result) => {});
        Swal.fire({
          icon: 'success',
          title: 'Category is enabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  addkeywordtoservice() {
    let finallist: any[] = [];
    this.keywordstoadd.forEach((e) => {
      let obj: any = {
        is_accepted: 1,
        is_deleted: 0,
        text: e,
      };
      finallist.push(obj);
    });
    let finalobj: any = {
      serviceId: this.toaddkeywordsservice.id,
      keywords: finallist,
    };
    this.categser.addkeywordstoservice(finalobj).subscribe((e) => {
      

      this.compser
        .addkeywordsautoforcompany(
          finallist,
          this.toaddkeywordsservice.id,
          'service',
          this.toaddkeywordsservice
        )
        .subscribe((e) => {
          this.decline();
   
          this.ngOnInit();
        });
    });
  }
}
