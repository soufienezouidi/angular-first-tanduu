import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import { SubCategoriesModule } from '../../../sub-categories/sub-categories.module';
import { CategoriesService } from '../../../services/categories.service';
import { TagModel } from 'ngx-chips/core/accessor';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BlogService } from '../../../services/tandu-admin/blog.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PagesService } from 'src/app/services/tandu-admin/pages.service';
declare var $: any;
declare var selection: any;
declare var valueKey: any;
@Component({
  selector: 'app-blog',
  templateUrl: './add-li.component.html',
  styleUrls: ['./add-li.component.css'],
})
export class AddLegalInformations implements OnInit {
  lien: any;
  lifr: any;
  lide: any;
  pageinfos: any;
  constructor(private pages: PagesService) {}

  ngOnInit() {
    this.pages.getpagebyname('ct').subscribe((e: any) => {
      this.pageinfos = e;
    });
  }

  submitaddblog() {}
  submitctfr() {
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
        this.pages.updatepage(this.pageinfos).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'customer terms of use updated',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  submitcten() {
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
        this.pages.updatepage(this.pageinfos).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'customer terms of use updated',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  submitctde() {
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
        this.pages.updatepage(this.pageinfos).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'customer terms of use updated',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: '250px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
}
