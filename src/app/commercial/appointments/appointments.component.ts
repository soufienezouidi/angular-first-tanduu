import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  list: any = [];
  modalRef: BsModalRef;
  patientId;
  appointments: any = [];
  patients: any = [];
  appointmentId;
  constructor(
    public commonService: CommonServiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getPatients();

    this.list = this.commonService.getJSON();
    this.list = this.list.filter((a) => a.status === 0);
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
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a) => a.id != data.id);
      this.getPatients();
    });
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

  decline() {
    delete this.appointmentId['patients'];
    let data = {
      ...this.appointmentId,
    };
    data['status'] = 'decline';
    this.commonService.updateAppointment(data, data.id).subscribe((res) => {
      this.modalRef.hide();
      this.appointments = this.appointments.filter((a) => a.id != data.id);
      this.getPatients();
    });
  }

  getAppointments() {}

  getPatients() {}
}
