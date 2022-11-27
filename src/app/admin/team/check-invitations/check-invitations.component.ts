import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvitationsService } from '../../services/invitations/invitations.service';

@Component({
  selector: 'app-check-invitations',
  templateUrl: './check-invitations.component.html',
  styleUrls: ['./check-invitations.component.css']
})
export class CheckInvitationsComponent implements OnInit {
  invitationKey: any;
  status: any;
  invitationSelected: any;
  isAccepted: any
  senderName: any;
  userConnected: any;
  userReceiver: any;
  isLoading: any = true;
  constructor(private activatedRoute: ActivatedRoute,
    private invitationsService: InvitationsService) { }

  ngOnInit(): void {

    // get tid user data from localStorage
    this.userConnected = JSON.parse(localStorage.getItem("main"));

    // get the id from url parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.invitationKey = params['invitation_key'];
      this.status = params['status'];
    });

    // call function "get inviatation by key"
    this.getInvitationByKey();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }


  /* get Invitation by key */
  getInvitationByKey() {
    let obj = {
      "key": this.invitationKey
    }
    this.invitationsService.getInvtationBykEY(obj).subscribe(data => {
      this.userReceiver = data.invitations.userReceiver.id;
      //console.log(data)
      //console.log(this.userReceiver)
      //console.log(this.userConnected.id)

      if (this.userConnected.id == this.userReceiver) {
        this.invitationSelected = data.invitations;
        // call function accept invitation
        if (this.status == "accept") {
          this.acceptInvitation(this.invitationKey, this.status)
        }

        // call function decline invitation
        if (this.status == "decline") {
          this.DeclineInvitation(this.invitationKey, this.status)
        }
      }
      else {
        this.invitationSelected = "not found";
        this.isAccepted = "not found";
      }

      //  //console.log(this.invitationSelected)
    });
  }

  /* accept invitation  */
  acceptInvitation(key: any, status: any) {
    this.invitationsService.acceptInvitation(key, status).subscribe(data => {
      this.isAccepted = data.success;
      //console.log(data)

    });
  }

  /* decline invitation  */
  DeclineInvitation(key: any, status: any) {

    this.invitationsService.declineInvitation(key, status).subscribe(data => {
      this.isAccepted = data.success;
      //console.log(data)
    });
  }

  // show result after loading 
  loadPage() {
    this.isLoading = false;
  }
}
