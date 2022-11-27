import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommonServiceService } from '../../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { CommercialsService } from '../../services/tandu-admin/commercials.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  list: any = [];
  modalRef: BsModalRef;
  appointmentId;
  appointments: any = [];
  patients: any = [];
  clients: any[] = [];
  nbrclients: any;
  patientsLength;
  appointmentsLength;
  TotalPatientsLength;
  activeTab = 'upcomming';
  infos: any;
  income: any;
  incometoday: any;
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    public commercialserv: CommercialsService,
    private modalService: BsModalService
  ) {}

  serviceLang: any;
  ngOnInit(): void {
    this.serviceLang = 'name_' + localStorage.getItem('language');
    this.commercialserv
      .getcommercialbyid(JSON.parse(localStorage.getItem('main')).id)
      .subscribe((e: any) => {
        this.infos = e;
        this.getPatients();

        this.getincome();
        this.getclients();
      });
  }

  getclients() {
    this.commercialserv
      .getcommercialbucommid(this.infos.id)
      .subscribe((datacom: any) => {
        this.clients = datacom;
        this.nbrclients = this.clients.length;
      });
  }
  getincome() {
    this.commercialserv
      .getcommercialincomebyid(this.infos.id)
      .subscribe((data: any) => {
        this.income = data.res[0]['SUM(income)'];
      });
    this.commercialserv
      .getcommercialincometodaybyid(this.infos.id)
      .subscribe((data: any) => {
        this.incometoday = data.res;
      });
  }
  search(activeTab) {
    this.activeTab = activeTab;
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#09e5ab';
    document.getElementById('btn-yes').style.border = '1px solid #09e5ab';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#09e5ab';
    document.getElementById('btn-no').style.border = '1px solid #09e5ab';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }

  openModal(template: TemplateRef<any>, appointment) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  confirm(value) {
    delete this.appointmentId['patients'];
    let data = {
      ...this.appointmentId,
    };
    data['status'] = 'accept';
    this.commonService.updateAppointment(data, data.id).subscribe((res) => {
      this.toastr.success('', 'Updated successfully!');
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a) => a.id != data.id);
    });
  }

  decline() {
    delete this.appointmentId['patients'];
    let data = {
      ...this.appointmentId,
    };
    data['status'] = 'decline';
    this.commonService.updateAppointment(data, data.id).subscribe((res) => {
      this.toastr.success('', 'Decline successfully!');
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a) => a.id != data.id);
    });
  }

  getPatients() {}
  totclients: any = {
    languages: {
      name_en: 'Total clients',
      name_fr: 'Nombre total de clients',
      name_de: 'Kunden insgesamt',
    },
  };
  monthclients: any = {
    languages: {
      name_en: 'Monthly clients',
      name_fr: 'Clients mensuels',
      name_de: 'Monatliche Kunden',
    },
  };
  code: any = {
    languages: {
      name_en: 'Your code ',
      name_fr: 'Votre code',
      name_de: 'Dein Code',
    },
  };
  weekly: any = {
    languages: {
      name_en: 'Weekly clients',
      name_fr: 'Clients hebdomadaires',
      name_de: 'Wöchentliche Kunden',
    },
  };
  qrcode: any = {
    languages: {
      name_en: 'Your QR code',
      name_fr: 'Votre code QR',
      name_de: 'Ihr QR-Code',
    },
  };
  cancel() {
    this.modalRef.hide();
  }
}
