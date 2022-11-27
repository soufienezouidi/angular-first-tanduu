import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  BsModalRef,
  ModalDirective,
  BsModalService,
} from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { CommonServiceService } from 'src/app/common-service.service';
import { ExpressService } from 'src/app/services/tandu-admin/express.service';
import Swal from 'sweetalert2';

declare var $: any;
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-express-services',
  templateUrl: './express-services.component.html',
  styleUrls: ['./express-services.component.css'],
})
export class ExpressServicesComponent implements OnInit {
  ngOnInit(): void {}
  constructor(
    private expressserv: ExpressService,
    public dialog: MatDialog,
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.getexpresssrvices();
  }
  getexpresssrvices() {
    this.expressserv.getexpresslist().subscribe((exps: any) => {
      this.expresses = exps;
      this.expresses.forEach((e: any) => {
        e.languages = JSON.parse(e.languages);
      });
    });
  }
  expresses: any[] = [];
  modalRef: BsModalRef;
  showmodal() {
    AppComponent.namecategfrommodam = 'express test';
    AppComponent.idcategfrommodam = 1;
    $('#addexpressicon').modal('show');
  }
  showmodaladdexpress() {
    $('#addexpress').modal('show');
  }
  showmodaladdimgexpress(ex: any) {
    AppComponent.nameexpress = ex.name;
    AppComponent.idexpress = ex.id;
    $('#addserviceimg').modal('show');
  }
  disableexpress(express: any) {}
  disableall() {
    Swal.fire({
      title: 'Are you sure you want to disable all express services?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Disabled!  ',
          'you can always enbale them with enable all button ',
          'success'
        );
      } else {
        Swal.fire('Cacelled', '', 'info');
      }
    });
  }
  enableall() {
    Swal.fire({
      title: 'Are you sure you want to enable all express services?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          'Enabled!  ',
          'you can always edite their state  ',
          'success'
        );
      } else {
        Swal.fire('Cacelled', '', 'info');
      }
    });
  }
  categtoedit: any;
  editModal(template: TemplateRef<any>, sub: any) {
    this.categtoedit = sub;

    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
    });
  }
  updateexpress() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'category will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categtoedit.name = this.categtoedit.languages.name_en;
        this.expressserv
          .editexpress(this.categtoedit)
          .subscribe((element: any) => {
            Swal.fire('Success!', 'Category is now updated.', 'success').then(
              (e: any) => {
                window.location.reload();
              }
            );
          });
      }
    });
  }
  async editphotosub(template: TemplateRef<any>, sub: any) {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your sub category picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        Swal.fire({
          imageUrl: e.target.result,
          imageAlt: 'Save ?',
          title: 'Save new Photo  for ' + sub.name + '?',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Updated!',
              'Your sub category has been updated.',
              'success'
            );
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }
  decline() {
    this.modalRef.hide();
  }

  msg = '';
  urlimgcategory: any;
  msgcategory = '';
  fileToUploadcateg: File;
  selectFilecategory(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUploadcateg = event.target.files[0];
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
  }
  updatephoto() {}
}
