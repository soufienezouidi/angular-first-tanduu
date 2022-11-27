import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm } from '@angular/forms';
import * as $ from 'jquery';
import 'datatables.net';
import { InvitationsService } from '../../services/invitations/invitations.service';

@Component({
  selector: 'app-invitations-received',
  templateUrl: './invitations-received.component.html',
  styleUrls: ['./invitations-received.component.css'],
})
export class InvitationsReceivedComponent implements OnInit {
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

  constructor(
    private modalService: BsModalService,
    private invitationsService: InvitationsService
  ) {}

  ngOnInit(): void {
    this.userConnected = JSON.parse(localStorage.getItem('rest'));
    // get all invitation received
    this.getALLInvitationsReceived(this.userConnected.rest_id);
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

  searchInsideDatatble(text: any) {
    //console.log(text)
    this.datatable.search($(this).val()).draw();
  }

  /* ============================================== */
  /* GET ALL INVITATIONS SENT */
  /* ============================================== */

  getALLInvitationsReceived(userId: any) {
    let obj = {
      user_id: userId,
    };
    this.invitationsService.getAllInvitationsReceived(obj).subscribe((data) => {
      this.invitationsSent = data.invitations;
      //console.log(data)
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
  /* Send invitation to existing user */
  onSubmit(f: NgForm) {
    let obj = {
      sender_id: this.userConnected.rest_id,
      role: f.form.controls.old_role.value,
      account_number: f.form.controls.account_number.value,
      email: f.form.controls.old_email.value,
    };
    this.invitationsService
      .sentInvitationToExistingUser(obj)
      .subscribe((data) => {
        //console.log(data)
        if (data.success == true) {
          this.errorInvitation = false;
          this.successInvitation = true;
          // this.getALLInvitationsSent(this.userConnected.id);
          /* this.socket.emit('send-join-team-request', {
           sender: 1,
           message: 'join us bro',
           reciever: 3,
         });*/
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
    let obj = {
      sender_id: this.userConnected.id,
      email: f.form.controls.email.value,
      first_name: f.form.controls.first_name.value,
      last_name: f.form.controls.last_name.value,
      role: f.form.controls.role.value,
    };
    //console.log(obj)
    this.invitationsService.sentInvitationToNewUser(obj).subscribe((data) => {
      //console.log(data)
      if (data.success == true) {
        this.errorNewInvitation = false;
        this.successNewInvitation = true;
        // this.getALLInvitationsReceived(this.userConnected.id);
      } else {
        this.errorNewInvitation = true;
        this.successNewInvitation = false;
        this.messageNewError = data.success;
      }
    });
  }

  /* accept invitation  */
  acceptInvitation(key: any) {
    let status = 'accept';
    this.invitationsService.acceptInvitation(key, status).subscribe((data) => {
      this.getALLInvitationsReceived(this.userConnected.rest_id);
    });
  }

  /* delcine invitation */
  declineInvitation(key: any) {
    let status = 'decline';
    this.invitationsService.declineInvitation(key, status).subscribe((data) => {
      this.getALLInvitationsReceived(this.userConnected.id);
    });
  }
}
