import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';

declare var $: any;
import 'datatables.net';
import { InvitationsService } from '../../services/invitations/invitations.service';
import { io } from 'socket.io-client';
import { AppComponent } from 'src/app/app.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
const SOCKET_ENDPOINT = 'https://realtime.aroundorder.com:3200';
@Component({
  selector: 'app-invitations-sent',
  templateUrl: './invitations-sent.component.html',
  styleUrls: ['./invitations-sent.component.css'],
})
export class InvitationsSentComponent implements OnInit {
  items = [
    'Orders management',
    'Team management',
    'Accounting',
    'Office',
    'Invoices',
  ];
  socket: any;
  datatable: any;
  modalRef: BsModalRef;
  todayNumber: number = Date.now();
  todayDate: Date = new Date();
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();
  id: any;
  isClicked: any = false;
  isNewUser: any = false;
  isOldUser: any = false;
  isOldClicked: any = false;
  isNewClicked: any = false;
  formIsShown: any = false;
  invitationsSent: any;
  userConnected: any;
  messageExistError: any;
  messageNewError: any;
  errorInvitation: any = false;
  errorNewInvitation: any = false;
  successInvitation: any = false;
  successNewInvitation: any = false;
  searchText: any;
  allPrivileges: any;
  fullnameJobber: any;

  constructor(
    private modalService: BsModalService,
    private invitationsService: InvitationsService
  ) {}

  ngOnInit(): void {
    this.socket = io(SOCKET_ENDPOINT);
    this.userConnected = JSON.parse(localStorage.getItem('main'));
    // get all invitation sent by user
    this.getALLInvitationsSent(this.userConnected.id);
    const table: any = $('#invitations_sent');
    this.datatable = table.DataTable({
      searching: true,
      language: {
        emptyTable: 'No invitations sent were found',
      },
    });

    $('#custom-box').keyup(function () {
      table.search($(this).val()).draw();
    });
  }
  openModal(template: TemplateRef<any>, obj: any) {
    const d = {
      invitationId: obj.id,
    };
    this.invitationsService.getAllAccess(d).subscribe((data) => {
      const arr: any = JSON.parse(data.message.privilege);
      const t: any[] = [];
      let section: any;
      let accessText: any;
      Object.keys(arr).forEach((element) => {
        if (element === 'see_received_auftrags') {
          section = 'orders management';
          accessText = 'See received orders.';
        } else if (element === 'create_new_auftrags') {
          section = 'orders management';
          accessText = 'Create new order.';
        } else if (element === 'see_sent_auftrags') {
          section = 'orders management';
          accessText = 'See sent order.';
        } else if (element === 'see_members') {
          section = 'team management';
          accessText = "See list of my member's team";
        } else if (element === 'create_new_invitations') {
          section = 'team management';
          accessText = 'Invite new members.';
        } else if (element === 'see_received_invitations') {
          section = 'team management';
          accessText = 'See received invitations.';
        } else if (element === 'see_sent_invitations') {
          section = 'team management';
          accessText = 'See sent invitations.';
        } else if (element === 'see_customers') {
          section = 'office';
          accessText = 'See customers list';
        } else if (element === 'see_calendar') {
          section = 'office';
          accessText = 'See calendar';
        } else if (element === 'cashbook') {
          section = 'accounting';
          accessText = 'See and manage cashbook.';
        } else if (element === 'balancing_list') {
          section = 'accounting';
          accessText = 'See balancing list.';
        } else if (element === 'see_invoices') {
          section = 'invoices';
          accessText = 'See and manage invoices.';
        } else if (element === 'create_invoices') {
          section = 'invoices';
          accessText = 'Create and generate invoices.';
        } else if (element === 'articles') {
          section = 'invoices';
          accessText = 'Create and manage articles';
        } else {
          section = 'file management';
          accessText = 'Manage file management';
        }
        t.push({
          // tslint:disable-next-line: radix
          invitationId: parseInt(obj.id),
          accesstitle: element,
          access_action: arr[element],
          section: section,
          accessText: accessText,
        });
      });
      this.allPrivileges = t;
      this.fullnameJobber = obj.first_name + ' ' + obj.last_name;
      //   //console.log(data)
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog',
      backdrop: 'static',
      keyboard: false,
    });
  }
  changeAccess(value: any) {
    const accesstitle = value.split('|')[0];
    const invitationId = value.split('|')[1];
    const d = {
      invitationId: parseInt(invitationId),
    };
    this.invitationsService.getAllAccess(d).subscribe((data) => {
      const p: any = JSON.parse(data.message.privilege);
      if ($('#' + accesstitle + '_' + invitationId + '').is(':checked')) {
        p[accesstitle] = true;
        // tslint:disable-next-line: no-string-literal
        d['privilege'] = p;

        this.invitationsService
          .updateAccessForUser(d)
          .subscribe((success) => {});
      } else {
        p[accesstitle] = false;
        // tslint:disable-next-line: no-string-literal
        d['privilege'] = p;
        this.invitationsService
          .updateAccessForUser(d)
          .subscribe((success) => {});
      }
    });
  }
  showAccessSettingModal(obj: any) {
    const d = {
      invitationId: obj.id,
    };
    this.invitationsService.getAllAccess(d).subscribe((data) => {
      const arr: any = data.message.privilege;
      const t: any[] = [];
      let section: any;
      let accessText: any;
      Object.keys(arr).forEach((element) => {
        if (element === 'see_received_auftrags') {
          section = 'orders management';
          accessText = 'See received orders.';
        } else if (element === 'create_new_auftrags') {
          section = 'orders management';
          accessText = 'Create new order.';
        } else if (element === 'see_sent_auftrags') {
          section = 'orders management';
          accessText = 'See sent order.';
        } else if (element === 'see_members') {
          section = 'team management';
          accessText = "See list of my member's team";
        } else if (element === 'create_new_invitations') {
          section = 'team management';
          accessText = 'Invite new members.';
        } else if (element === 'see_received_invitations') {
          section = 'team management';
          accessText = 'See received invitations.';
        } else if (element === 'see_sent_invitations') {
          section = 'team management';
          accessText = 'See sent invitations.';
        } else if (element === 'see_customers') {
          section = 'office';
          accessText = 'See customers list';
        } else if (element === 'see_calendar') {
          section = 'office';
          accessText = 'See calendar';
        } else if (element === 'cashbook') {
          section = 'accounting';
          accessText = 'See and manage cashbook.';
        } else if (element === 'balancing_list') {
          section = 'accounting';
          accessText = 'See balancing list.';
        } else if (element === 'see_invoices') {
          section = 'invoices';
          accessText = 'See and manage invoices.';
        } else if (element === 'create_invoices') {
          section = 'invoices';
          accessText = 'Create and generate invoices.';
        } else if (element === 'articles') {
          section = 'invoices';
          accessText = 'Create and manage articles';
        } else {
          section = 'file management';
          accessText = 'Manage file management';
        }
        t.push({
          invitationId: parseInt(obj.id),
          accesstitle: element,
          access_action: arr[element],
          section: section,
          accessText: accessText,
        });
      });
      AppComponent.jobberListAccess = t;
      //   //console.log(data)
    });
    AppComponent.jobberaAccessFirstNname = obj.first_name + ' ' + obj.last_name;
    AppComponent.jobberAccessId = obj.id;
    $('#set_access_setting').modal('show');
  }

  searchInsideDatatble(text: any) {
    this.datatable.search($(this).val()).draw();
  }
  getALLInvitationsSent(userId: any) {
    const obj = {
      user_id: userId,
    };
    this.invitationsService.getAllInvitationsSent(obj).subscribe((data) => {
      this.invitationsSent = data.invitations;
    });
  }
  showSendNewInvitation() {
    this.isClicked = true;
    this.isNewClicked = true;
  }
  closeSendNewInvitation() {
    this.isClicked = false;
    this.isOldUser = false;
    this.isNewUser = false;
    this.formIsShown = false;
    this.errorInvitation = false;
    this.successInvitation = false;
  }

  showFormOldUser() {
    this.isOldUser = true;
    this.isNewUser = false;
    this.formIsShown = true;
  }

  showFormNewUser() {
    this.isOldUser = false;
    this.isNewUser = true;
    this.formIsShown = true;
  }

  /* Send invitation to existing user */
  onSubmit(f: NgForm) {
    console.log(f);
    const obj = {
      sender_id: this.userConnected.id,
      role: f.form.controls.old_role.value,
      account_number: f.form.controls.account_number.value,
      email: f.form.controls.old_email.value,
    };
    this.invitationsService
      .sentInvitationToExistingUser(obj)
      .subscribe((data) => {
        if (data.success === true) {
          this.errorInvitation = false;
          this.successInvitation = true;
          this.getALLInvitationsSent(this.userConnected.id);
          this.socket.emit('send-join-team-request', {
            sender: 1,
            message: 'join us bro',
            reciever: 3,
          });
        } else {
          this.errorInvitation = true;
          this.successInvitation = false;
          this.messageExistError = data.success;
        }
      });
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
  }

  /* Send invitation to new user */
  onSubmit2(f: NgForm) {
    const obj = {
      sender_id: this.userConnected.id,
      email: f.form.controls.email.value,
      first_name: f.form.controls.first_name.value,
      last_name: f.form.controls.last_name.value,
      role: f.form.controls.role.value,
    };
    this.invitationsService.sentInvitationToNewUser(obj).subscribe((data) => {
      if (data.success === true) {
        this.errorNewInvitation = false;
        this.successNewInvitation = true;
        this.getALLInvitationsSent(this.userConnected.id);
      } else {
        this.errorNewInvitation = true;
        this.successNewInvitation = false;
        this.messageNewError = data.success;
      }
    });
  }
  /* Filter list of members */
  filterTeam(value: any) {
    if (value === 'all') {
      $('[data-group]').show();
      return false;
    }
    const $currentLists = $('[data-group=' + value + ']');
    $('[data-group]').not($currentLists).hide();
    $currentLists.show();
  }
}
