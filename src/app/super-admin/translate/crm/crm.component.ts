import { Component, OnInit, TemplateRef } from '@angular/core';
import 'datatables.net';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '../../../services/tandu-admin/translate.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {


  datatable: any;
  modalRef: BsModalRef;
  isDisabled: any;
  isClicked: any;
  errorMessage = '';
  form: any = {}
  isSuccessful: any
  texts: any;
  pages: any[] = ["profile page", "side menu", "dashboard"]

  enText: any;
  frText: any;
  deText: any;
  constructor(
    private http: HttpClient,
    private TranslateService: TranslateService,
    private modalService: BsModalService,
  ) {
    this.isDisabled = false;
    this.isClicked = false;
    setTimeout(function () {
      $(function () {
        $('#crm_plateform').DataTable({
          language: {
            emptyTable: 'No Texts found',
          },
          pageLength: 100,
          columnDefs: [
            {
              targets: [7],
              visible: false,
              searchable: false,
            },
          ],
          order: [[7, 'DESC']],
        });
      })

    }, 3000)
  }

  ngOnInit(): void {
   



    this.getAllTexts();
  }

  openModalAddText(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: "static",
      keyboard: false
    });
  }

  onSubmit(f: any) {
    let objText =
    {
      "original_text_en": f.form.controls.english_text.value,
      "original_text_fr": f.form.controls.frensh_text.value,
      "original_text_de": f.form.controls.deutsch_text.value,
      "page": f.form.controls.page.value,
      "section": f.form.controls.section.value,
      "is_deleted": 0
    }
    this.TranslateService.create(objText).subscribe(data => {
      this.getAllTexts();
      // location.reload()
      this.modalRef.hide();
    })
  }
  allTexts: any = [];
  getAllTexts() {
    this.TranslateService.getTextsByCRM().subscribe(
      (data) => {
         this.allTexts = data

      },
      (error) => {
      }
    );
  }

  editAllTexts() {
    this.isClicked = true;
    this.isDisabled = true;
    $('.translate').css('display', 'block');
    $('.urlTexts').css('display', 'block');
    $('.sectionsFields').css('display', 'block');
    $('.urlLinks').css('display', 'none');
    $('.sectionsTexts').css('display', 'none');
    $('.text_language').css('display', 'none');

  }
  arrTexts: any[] = []

  saveAllTexts() {
    this.isClicked = false;
    this.isDisabled = false;
    $('.translate').css('display', 'none');
    $('.sectionsFields').css('display', 'none');
    $('.urlTexts').css('display', 'none');
    $('.text_language').css('display', 'block');
    $('.urlLinks').css('display', 'block');
    $('.sectionsTexts').css('display', 'block');
    $('.text_language').css('display', 'block');
    var items: any = document.getElementsByClassName('textField');
    this.arrTexts = items;
    var listId = document.getElementsByClassName('list-id');

  }


  openModalEdit(template: TemplateRef<any>, item: any) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-lg',
      backdrop: "static",
      keyboard: false
    });

    this.enText = item.original_text_en;
    this.frText = item.original_text_fr;
    this.deText = item.original_text_de;
    localStorage.setItem("textId", item.id)
  }


  onSubmit2(f: any) {
    let objText =
    {
      "id": parseInt(localStorage.getItem('textId')),
      "original_text_en": f.form.controls.english_text.value,
      "original_text_fr": f.form.controls.frensh_text.value,
      "original_text_de": f.form.controls.deutsch_text.value,
    }
    this.TranslateService.update(objText).subscribe(data => {
      this.getAllTexts();
      // location.reload()
      this.modalRef.hide();
    })
    //  location.reload()
    this.modalRef.hide();
  }
}
