import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OrderSentService } from '../../services/orders/order-sent/orders-sent.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicesService } from '../../services/categories/services.service';
import { elementAt } from 'rxjs/operators';
import { InformationsService } from '../../services/orders/informations/informations.service';
import { CompaniesService } from '../../services/companies_services/companies.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  order: any;
  order_id: any;
  bgColor: any;
  textColor: any;
  styles: any;
  statusTab: any = [
    'New',
    'Accepted',
    'In processing',
    'Cancelled',
    'Refused',
    'Paid',
    'Closed',
    'Transfer',
    'Unrecoverable',
  ];
  bodySelectStatus: any = false;
  ordersServices: any;
  descriptionSetting: any;
  hideDescription: any = true;
  serviceSetting: any = false;
  services: any;
  listWords: any = [];
  resultSearch: any;
  singleCompany: any;
  informations: any;
  infos: any;
  notes: any;
  userConnected: any;
  showNotes: any = false;
  lastNote: any;
  d: any = new Date();
  day: any = this.d.getDate();
  month: any = this.d.getMonth();
  year: any = this.d.getFullYear();
  fullDate: any =
    this.year +
    '-' +
    this.month +
    '-' +
    this.day +
    ' ' +
    this.d.getHours() +
    ':' +
    this.d.getMinutes();

  constructor(
    private orderSentService: OrderSentService,
    private servicesServices: ServicesService,
    private informationsService: InformationsService,
    private companyService: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private teamSevrices: TeamsService
  ) {
    //get user connected
    this.userConnected = JSON.parse(localStorage.getItem('rest'));
    //console.log("user connected :")
    //console.log(this.userConnected)

    /*  get company by user id */
    this.getCompanyByUser();

    // get the id from url parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      this.order_id = params['order_id'];
    });

    // get order by id
    this.getOrder();

    // get services by order id
    this.getOrderServices();

    /* get all services */
    this.getAllServices();
  }

  sendAgain() {
    let list_jobers: any[] = this.order.jobbers_list;

    let sendobj: any = {
      sender: this.userConnected.rest_id,
      receiver: 3,
      state: 1,
    };
    var index = this.order.jobbers_list.findIndex(function (item, i) {
      return item.receiver === 3;
    });

    if (
      index < 0 ||
      (this.order.jobbers_list[index].state == 0 &&
        this.order.jobbers_list[index].sender != this.userConnected.rest_id)
    ) {
      this.order.jobbers_list.push(sendobj);
      this.orderSentService.updateOrder(this.order).subscribe((res: any) => {});
    } else {
      if (
        this.order.jobbers_list[index].state == 1 &&
        this.order.jobbers_list[index].sender != this.userConnected.rest_id
      ) {
        alert('offer already sent by you to this client');
      } else {
        alert('alreay sent by you ');
      }
    }
  }

  ngOnInit(): void {}

  /* ================================================================= */
  /* get all necessary data of order
  /* ================================================================= */

  /* get order by id */
  getOrder() {
    let obj = {
      order_id: this.order_id,
    };
    this.orderSentService.getOrderById(obj).subscribe((data) => {
      this.order = data;
      this.infos = data.informations;
      this.getStatus(this.order.status);
    });
  }

  /* get services by order id */
  getOrderServices() {
    let obj = {
      order_id: this.order_id,
    };
    this.orderSentService.getOrderServices(obj).subscribe((data) => {
      this.ordersServices = data;
    });
  }

  /* get all services */
  getAllServices() {
    this.servicesServices.getAllServices().subscribe((services) => {
      this.services = services;

      this.services.forEach((element) => {
        this.listWords.push({
          id: element.id,
          name: element.languages.name_en,
          category: element.sub_category.category.id,
          subCategory: element.sub_category.id,
        });
        this.listWords.push({
          id: element.id,
          name: element.languages.name_fr,
          category: element.sub_category.category.id,
          subCategory: element.sub_category.id,
        });
        this.listWords.push({
          id: element.id,
          name: element.languages.name_de,
          category: element.sub_category.category.id,
          subCategory: element.sub_category.id,
        });
      });
    });
  }

  /*  get company by user id */
  getCompanyByUser() {
    var obj = {
      user_id: this.userConnected.rest_id,
    };
    this.companyService.getCompanyUser(obj).subscribe((company) => {
      this.singleCompany = company;
      this.getAllUrgentInformations(company.id);
      this.getAllNotes(company.id);
    });
  }

  /* get all informations of partners */
  getAllUrgentInformations(company_id: any) {
    var obj: any = {
      company_id: company_id,
    };

    //get ll urgent informations
    this.informationsService.getAllUrgentInformations(obj).subscribe((data) => {
      this.informations = data.informations;
      //console.log(this.order)
    });
  }

  /* get all notes */
  getAllNotes(companyId: any) {
    let obj = {
      order_id: this.order_id,
    };
    this.orderSentService.getOrderById(obj).subscribe((data) => {
      //   this.notes = data.note;
      // const largeGroup = recActivities.filter(activity => (activity.maxCap > 15));
      if (data.note) {
        this.notes = data.note.filter((i) => i.companyId == companyId);
        this.lastNote = this.notes.pop();
      }
    });
  }

  /* ================================================================= */
  /*  /END get all necessary data of order
  /* ================================================================= */

  /* check order status */
  getStatus(status: String) {
    if (status == 'New') {
      this.styles = {
        color: '#000000',
        'background-color': '#DADADA',
        'font-weight': 'bold',
      };
    } else if (status == 'Accepted') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#009FE3',
        'font-weight': 'bold',
      };
    } else if (status == 'In processing') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#f79a07',
        'font-weight': 'bold',
      };
    } else if (status == 'Cancelled') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#e51a0b',
        'font-weight': 'bold',
      };
    } else if (status == 'Refused') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#4b0bed',
        'font-weight': 'bold',
      };
    } else if (status == 'Paid') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#38a509',
        'font-weight': 'bold',
      };
    } else if (status == 'Closed') {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#274e13',
        'font-weight': 'bold',
      };
    } else if (status == 'Transfer') {
      this.styles = {
        color: '#000000',
        'background-color': '#f1c232',
        'font-weight': 'bold',
      };
    } else {
      this.styles = {
        color: '#FFFFFF',
        'background-color': '#000000',
        'font-weight': 'bold',
      };
    }
  }

  checkExistInformation(arrayInfo: any, id: any) {}

  /* open status settings */
  openStatusSetting() {
    this.bodySelectStatus = true;
  }
  /* open status settings */
  openDescriptionSetting() {
    this.descriptionSetting = true;
    this.hideDescription = false;
  }

  /* open seting add services */
  openSettingAddService() {
    this.serviceSetting = true;
  }

  /* search for services  */
  searchEngineFunction(value: any) {
    var key_word: any = value;
    var suggestions: any = this.listWords;
    var sp = key_word.split(' ');
    let arr = [];
    for (var i = 0; i < sp.length; i++) {
      for (var j = 0; j < suggestions.length; j++) {
        if (suggestions[j].name.includes(sp[i]) && sp[i] != '' && j <= 5) {
          arr.push({
            id: suggestions[j].id,
            name: suggestions[j].name,
            categoryId: suggestions[j].category,
            subCategoryId: suggestions[j].subCategory,
          });
        }
      }
    }
    this.resultSearch = arr;
    //console.log(arr)
  }

  /* open dialog delete service */
  openDialogDeleteService(id: any) {
    var name = $('#updated_information' + id).val();
    // $("#title-modal").text("Delete Information");
    var text = 'Are you sure to delete this service';
    Swal.fire({
      title: 'Are you sure?',
      html: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeletionService(id);
        Swal.fire('Deleted!', 'Service was deleted successfully', 'success');
      }
    });
  }

  /*edit status */
  updateStatus(value: any) {
    var obj = {
      id: this.order.id,
      status: value,
    };
    this.gloablUpdateOrder(obj);
    this.bodySelectStatus = false;
  }

  /* update description */
  updateDescription(value: any) {
    var obj = {
      id: this.order.id,
      description: value,
    };
    this.gloablUpdateOrder(obj);
    this.descriptionSetting = false;
    this.hideDescription = true;
  }

  /* confirm deletion service */
  confirmDeletionService(id: any) {
    var obj = {
      serviceId: id,
      orderId: this.order_id,
      is_deleted: 1,
    };
    this.gloablUpdateOrderService(obj);
  }

  /* add service to order */
  addServiceToOrder(serviceId: any, categoryId: any, subCategoryId: any) {
    let obj = {
      orderId: this.order_id,
      serviceId: serviceId,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      is_deleted: 0,
    };
    this.gloablUpdateOrderService(obj);
    $('#search-filter').val('');
    this.resultSearch = [];
  }

  /* add new notes */
  addNote(note: any) {
    var arrayNotes: any = [];
    let noteObject = {
      note: note,
      created: this.fullDate,
      companyId: this.singleCompany.id,
    };
    if (!this.notes) {
      arrayNotes.push(noteObject);
      //console.log("nulllllll")
    } else {
      //console.log(this.notes)
      //console.log("not nulllllll")
    }
    // this.notes.push(noteObject);
    let obj = {
      id: this.order_id,
      note: arrayNotes,
    };
    //console.log(obj)
    this.gloablUpdateOrder(obj);
    this.getCompanyByUser();
  }

  /* show all notes */
  showAllNotes() {
    this.showNotes = true;
    this.getCompanyByUser();
  }

  /* hide all notes */
  hideAllNotes() {
    this.showNotes = false;
  }

  /* global function for update order */
  gloablUpdateOrder(obj: any) {
    this.orderSentService.updateOrder(obj).subscribe((data) => {
      this.getOrder();
    });
  }

  /* global function for update order */
  gloablUpdateOrderService(obj: any) {
    this.orderSentService.updateOrderService(obj).subscribe((data) => {
      this.getOrderServices();
    });
  }
}
