import {
  Component,
  ViewEncapsulation,
  OnInit,
  TemplateRef,
} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { OrderSentService } from '../services/orders/order-sent/orders-sent.service';
import { CompaniesService } from '../services/companies_services/companies.service';
import { SourcesService } from '../services/orders/sources/sources.service';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm } from '@angular/forms';
import { element } from 'protractor';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-orders-sent',
  templateUrl: './orders-sent.component.html',
  styleUrls: ['./orders-sent.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersSentComponent implements OnInit {
  today: number = Date.now();
  modalRef: BsModalRef;
  datatable: any;
  listGrid = false;
  listTable = true;
  image = ['1', '2', '3', '4', '5', '6'];
  list_orders: any;
  errorMessage: any;
  companyConnected: any;
  noteFailed: any = false;
  sources: any;
  sourceSelected: any;
  sourceFailed: any;
  showFormAddSource: any = false;
  updatedAppointment: any;
  userConnected: any = JSON.parse(localStorage.getItem('main'));
  constructor(
    private orderSentService: OrderSentService,
    private companyService: CompaniesService,
    private sourceService: SourcesService,
    private modalService: BsModalService
  ) {
    this.getCompanyByUser();
    setTimeout(function () {
      $(function () {
        $('#cashbook_tb').DataTable();
      });
    }, 3000);
  }

  GridClick() {
    $('#table_list').css('display', 'none');
    $('#grid-view-orders').css('display', 'inline');
    document.getElementById('list-view').classList.remove('active');
    document.getElementById('grid-view').classList.add('active');
    $('#grid-view').css('color', 'white');
    $('#list-view').css('color', 'black');
  }
  tableClick() {
    $('#table_list').css('display', 'inline');
    $('#grid-view-orders').css('display', 'none');
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    $('#grid-view').css('color', 'black');
    $('#list-view').css('color', 'white');
  }
  ngOnInit(): void {}

  /* get company connected */
  getCompanyByUser() {
    var obj = {
      user_id: this.userConnected.id,
    };
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
      let objectUser = {
        company_id: company.id,
      };
      this.orderSentService
        .getAllOrdersSent(objectUser)
        .subscribe((data: any) => {
          this.list_orders = data.data;
          //console.log(data)
        });
      this.getAllSources(company.id);
    });
  }

  /* ============================================================= */
  // Note section
  /* ============================================================= */

  /* open update note */
  openUpdateNote(orderId: any) {
    $('#lastNote' + orderId).css('display', 'none');
    $('#note_update' + orderId).css('display', 'inline');
  }

  /* function update note */
  updateNote(orderId: any, noteId: any, value: any) {
    let order: any = {
      order_id: orderId,
    };
    var app = '';
    this.orderSentService.getOrderById(order).subscribe((data: any) => {
      const arr = data.note;
      var objIndex = arr.findIndex((obj) => obj.id == noteId);
      //Update object's name property.
      arr[objIndex].note = value;
      let orderObject: any = {
        id: orderId,
        note: arr,
      };
      this.updateOrder(orderObject);
    });
  }

  /* add new note */
  addNewNote() {
    var orderIdObject: any = {
      order_id: parseInt(localStorage.getItem('order_id')),
    };
    var note = $('#newNoteText').val();

    if (note) {
      this.orderSentService
        .getOrderById(orderIdObject)
        .subscribe((data: any) => {
          const arr = data.note;
          //Update object's name property.
          if (arr) {
            arr.push({ id: arr.length + 1, note: note, last: true });
          } else {
            arr.push({ id: 1, note: note, last: true });
          }

          let orderObject: any = {
            id: parseInt(localStorage.getItem('order_id')),
            note: arr,
          };
          this.updateOrder(orderObject);
          this.modalRef.hide();
          localStorage.removeItem('order_id');
          this.noteFailed = false;
        });
    } else {
      this.noteFailed = true;
    }
  }
  closeNote() {
    this.modalRef.hide();
    localStorage.removeItem('order_id');
  }
  openModal(template: TemplateRef<any>, orderId: any) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
    localStorage.setItem('order_id', String(orderId));
  }
  /* ============================================================= */
  // End note section
  /* ============================================================= */

  /* ============================================================== */
  // Source section
  /* ============================================================== */

  /* get all sources of partners */
  getAllSources(company_id: any) {
    var arr: any = [];
    var obj: any = {
      company_id: company_id,
    };
    //get ll urgent informations
    this.sourceService.getAllSources(obj).subscribe(
      (data) => {
        //console.log(data)
        if (data && data.source_list.length > 0) {
          data.source_list.forEach((element) => {
            if (element.is_deleted === 0) {
              arr.push(element);
            }
          });
        }
        this.sources = arr;
        //console.log("source")
        //console.log(data)
      },
      (error) => {
        ////console.log(error);
      }
    );
  }

  /* open modal of sources list */
  openModalSources(template: TemplateRef<any>, orderId: any, source: string) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
    localStorage.setItem('order_id', String(orderId));
    localStorage.setItem('source', source);
    this.sourceSelected = localStorage.getItem('source');
  }

  /* close modal source list */
  closeSourceList() {
    this.modalRef.hide();
    localStorage.removeItem('order_id');
    localStorage.removeItem('source');
  }

  /* associate source to order */
  associateSourceToOrder(event: any) {
    var orderIdObject: any = {
      order_id: parseInt(localStorage.getItem('order_id')),
    };
    let orderObject: any = {
      id: parseInt(localStorage.getItem('order_id')),
      sourceId: event.value,
    };

    if ($(event).is(':checked')) {
      orderObject['sourceId'] = event.value;
      this.orderSentService
        .getOrderById(orderIdObject)
        .subscribe((data: any) => {
          this.updateOrder(orderObject);
          localStorage.setItem('source', event.value);
          this.sourceSelected = localStorage.getItem('source');
        });
    } else {
      this.orderSentService
        .getOrderById(orderIdObject)
        .subscribe((data: any) => {
          orderObject['sourceId'] = '';
          this.updateOrder(orderObject);
          localStorage.setItem('source', '');
          this.sourceSelected = localStorage.getItem('source');
        });
    }
  }

  /* open modal to add new sources */
  openModalNewSource(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  /* open new source */
  openNewSource() {
    this.showFormAddSource = true;
  }

  /* add new source */
  onSubmit(f: any) {
    var obj = {
      user_id: this.userConnected.id,
    };

    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
      this.sourceService
        .getAllSources({ company_id: company.id })
        .subscribe((data) => {
          const arr = data.source_list;
          var found = arr.some(
            (element) => element.name === f.controls.new_source.value
          );
          //Update object's name property.
          if (found) {
            this.sourceFailed = true;
            return false;
          }
          if (arr) {
            arr.push({
              id: arr.length + 1,
              name: f.controls.new_source.value,
              is_deleted: 0,
            });
          } else {
            arr.push({
              id: 1,
              name: f.controls.new_source.value,
              is_deleted: 0,
            });
          }
          let obj: any = {
            company_id: company.id,
            sources: arr,
          };
          this.sourceService.createOrUpdateSource(obj).subscribe((res) => {
            //this.getAllSources(company)
            this.getCompanyByUser();
          });
          localStorage.removeItem('order_id');
          localStorage.removeItem('source');
          this.showFormAddSource = false;
          f.controls.new_source = '';
        });
    });
  }

  /* show delete source alert */
  openAlertdeleteSource(i: any, sourceId: any) {
    $('#alertMessage_' + i + '_' + sourceId).toggle();
  }

  /* delete source */
  closeAlertdeleteSource(i: any, sourceId: any) {
    $('#alertMessage_' + i + '_' + sourceId).toggle();
  }

  /* delete source */
  deleteSource(i: any, sourceId: any) {
    var obj = {
      user_id: this.userConnected.id,
    };
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.companyConnected = company;
      this.sourceService
        .getAllSources({ company_id: company.id })
        .subscribe((data) => {
          const arr = data.source_list;
          const { length } = arr;
          const idInf = length + 1;
          //Find index of specific object using findIndex method.
          var objIndex = arr.findIndex((obj) => obj.id == sourceId);
          //Update object's name property.
          arr[objIndex].is_deleted = 1;
          let obj: any = {
            company_id: 1,
            sources: arr,
          };
          this.sourceService.createOrUpdateSource(obj).subscribe((res) => {
            this.getCompanyByUser();
          });
        });
    });
  }

  /* ============================================================== */
  // End Source section
  /* ============================================================== */

  /* ============================================================== */
  // Appointment section
  /* ============================================================== */
  /* open modal to add new sources */
  openModalEditAppointment(
    template: TemplateRef<any>,
    orderId: any,
    date: any
  ) {
    /*let order: any = {
      "order_id": orderId
    }
    this.orderSentService.getOrderById(order).subscribe((data: any) => {
      const arr = data.note;
      var objIndex = arr.findIndex((obj => obj.id == noteId));
      //Update object's name property.
      arr[objIndex].note = value;
      let orderObject: any = {
        "id": orderId,
        "note": arr
      };
      this.updateOrder(orderObject)
    })*/
    this.updatedAppointment = date;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  onSubmitAppointment(f: any) {}

  /* ============================================================== */
  // End Appointment section
  /* ============================================================== */

  /* update order */
  updateOrder(obj: any) {
    this.orderSentService.updateOrder(obj).subscribe((data) => {
      this.getCompanyByUser();
    });
  }
}
