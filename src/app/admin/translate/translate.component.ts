import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent implements OnInit {
  datatable: any;
  isDisabled: any;
  isClicked: any;
  texts: any;
  constructor(
    private http: HttpClient,
    private TranslateService: TranslateService
  ) {
    this.isDisabled = false;
    this.isClicked = false;
  }

  ngOnInit(): void {
    $(document).ready(function () {
      var groupColumn = 2;
      var table = $('#crm_plateform').DataTable({
        ajax: 'https://api.aroundorder.com:1337/api/tanduu_admin/translation',
        language: {
          emptyTable: 'No Texts found',
        },
        columnDefs: [
          {
            targets: [4],
            visible: false,
            searchable: false,
          },
          { visible: false, targets: groupColumn },
        ],
        drawCallback: function (settings) {
          var api = this.api();
          var rows = api.rows({ page: 'current' }).nodes();
          var last = null;

          api
            .column(groupColumn, { page: 'current' })
            .data()
            .each(function (group, i) {
              if (last !== group) {
                $(rows)
                  .eq(i)
                  .before(
                    '<tr class="group"><td colspan="4"><b>' +
                    group +
                    '</b>    <a href="#"><i class="fa fa-external-link" aria-hidden="true"></i>  visit page </a></td></tr>'
                  );

                last = group;
              }
            });
        },
        columns: [
          {
            data: null,
            render: function (row) {
              var textArea =
                '<span id="original_text_en' +
                row.id +
                '" class="text_language">' +
                row.original_text_en +
                '</span>' +
                '<div class="form-group translate" style="display: none" >' +
                '<textarea row=100 cols=60type="text" id="input" class="form-control textField" formControlName="txt" placeholder="add text">' +
                row.original_text_en +
                '</textarea>' +
                '<span class="icon-user">' +
                row.reference +
                '<input type="hidden" value="' +
                row.id +
                '" class="form-control list-id"></span>' +
                '</div>';

              return textArea;
            },
          },
          {
            data: null,
            render: function (row) {
              var textArea =
                '<span id="original_text_en' +
                row.id +
                '" class="text_language">' +
                row.original_text_en +
                '</span>' +
                '<div class="form-group translate" style="display: none" >' +
                '<textarea row=100 cols=60type="text" id="input" class="form-control textField" formControlName="txt" placeholder="add text">' +
                row.original_text_en +
                '</textarea>' +
                '<span class="icon-user">' +
                row.reference +
                '<input type="hidden" value="' +
                row.id +
                '" class="form-control list-id"></span>' +
                '</div>';
              return textArea;
            },
          },
          { data: 'page' },
          {
            data: null,
            render: function (row) {
              var textArea =
                '<span id="original_text_en' +
                row.id +
                '" class="text_language">' +
                row.original_text_en +
                '</span>' +
                '<div class="form-group translate" style="display: none" >' +
                '<textarea row=100 cols=60type="text" id="input" class="form-control textField" formControlName="txt" placeholder="add text">' +
                row.original_text_en +
                '</textarea>' +
                '<span class="icon-user">' +
                row.reference +
                '<input type="hidden" value="' +
                row.id +
                '" class="form-control list-id"></span>' +
                '</div>';
              return textArea;
            },
          },
          { data: 'id' },
        ],

        order: [[4, 'DESC']],
      });
    });

    this.getAllTexts();
  }

  getAllTexts() {
    this.TranslateService.getAll().subscribe(
      (data) => {
        this.texts = data;
        //console.log(data);
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  editAllTexts() {
    this.isClicked = true;
    this.isDisabled = true;
    $('.translate').css('display', 'block');
    $('.text_language').css('display', 'none');
  }

  saveAllTexts() {
    this.isClicked = false;
    this.isDisabled = false;
    $('.translate').css('display', 'none');
    $('.text_language').css('display', 'block');
    var items = document.getElementsByClassName('textField');
    var listId = document.getElementsByClassName('list-id');
    //console.log(items);
    //console.log(listId);
  }
}
