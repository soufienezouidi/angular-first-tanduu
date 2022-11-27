import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';

import Swal from 'sweetalert2';
declare var $: any;
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
})
export class SubCategoriesComponent implements OnInit {
  id: number;
  subcateg: any[] = [];
  subcatega: any[] = [];
  subcategd: any[] = [];
  current_categ: any;
  subcategp: any[] = [];
  modalRef: BsModalRef;
  subtoedit: any;
  constructor(
    private route: ActivatedRoute,
    private categser: CategoriesServices,
    private modalService: BsModalService,
    public router: Router
  ) {}
  gotosubservices(sub: any) {
    this.router.navigateByUrl('/tanduu-admin/servicess?id=' + sub['id']);
  }
  editModal(template: TemplateRef<any>, sub: any) {
    this.subtoedit = sub;

    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
    });
  }
  updatesubinfos() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'sub_category will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subtoedit.name = this.subtoedit.languages.name_en;
        this.categser
          .updatesubcategory(this.subtoedit)
          .subscribe((element: any) => {
            Swal.fire(
              'Success!',
              'sub_Category is now updated.',
              'success'
            ).then((e: any) => {
              window.location.reload();
            });
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
  addnewsubcategory() {
    AppComponent.namecategfrommodaloforaddsub = this.current_categ.name;
    AppComponent.idcategfrommodalforaddsub = this.current_categ.id;
    $('#addsubcategory').modal('show');
  }
  editphotoz(cat: any) {
    AppComponent.idsub = cat.id;
    AppComponent.namesub = cat.name;
    $('#addsubcategoryimg').modal('show');
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.categser.getcategorybyid(this.id).subscribe((el: any) => {
      this.current_categ = el;
    });
    this.categser
      .get_subcategoriesByCategoryid(this.id)
      .subscribe((element: any) => {
        this.subcateg = element;
        this.subcateg.forEach((e: any) => {
          e.languages = JSON.parse(e.languages);
        });
        this.subcateg.forEach((currentValue, index) => {
          if (currentValue.is_accepted && !currentValue.is_deleted) {
            this.subcatega.push(currentValue);
          }
          if (!currentValue.is_accepted) {
            this.subcategp.push(currentValue);
          }
          if (currentValue.is_deleted) {
            this.subcategd.push(currentValue);
          }
        });
      });
  }
  decline() {
    this.modalRef.hide();
  }
  updatesubcateg() {}
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
  disablsubcategory(a: any) {
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
        this.categser.enabledisablesub(categ).subscribe((result) => {
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
  enablesubcategory(a: any) {
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
        this.categser.enabledisablesub(categ).subscribe((result) => {});
        Swal.fire({
          icon: 'success',
          title: 'Category is enabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
}
