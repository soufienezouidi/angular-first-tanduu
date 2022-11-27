import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
})
export class AccountVerificationComponent implements OnInit {
  obj: any;
  date1: Date = new Date();
  date2: Date = new Date();
  mail: any;
  showkeyerror: boolean = false;
  errormessage: string = '';
  resendverif: boolean = false;
  currentLanguage: any;
  serviceLang: any;
  constructor(public authser: AuthenticationService, public router: Router) {}
  text: any;
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + this.currentLanguage;
    this.obj = localStorage.getItem('main');
    this.mail = JSON.parse(this.obj).email;
    this.date1 = new Date(JSON.parse(this.obj).expiredAt);
    var byphone = JSON.parse(this.obj).byphone;
    if(byphone){
      this.recievebox = JSON.parse(this.obj).phone
    }else{
      this.recievebox = JSON.parse(this.obj).email
    }
    this.date2 = new Date();

    this.resendverif = this.date2 > this.date1;
    if (this.resendverif === true) {
      this.resendverfication();
    }
    this.text = {
      languages: {
        name_en:
          'A verification code has been sent to  (' +
          this.recievebox +
          '). Please enter the received code   the appropriate place to activate your account. If you need any further information, please visit help center or contact support: info@tanduu.com .',
        name_fr:
          'Veuillez entrer le code reçu sur (' +
          this.recievebox +
          ")  pour activer votre compte. Sivous avez besoin de plus d'informations, s'il vous plaît contactez cnous sous : info@tanduu.com",
        name_de:
          'Ein Bestätigungscode wurde an diese Adresse gesendet (' +
          this.recievebox +
          '). Bitte geben Sie den empfangenen Code in das Feld ein, um Ihr Konto zu aktivieren. Wenn Sie die Email nicht finden, schauen Sie bitte auch im Spamordner nach oder überprüfen Sie Ihre Emailadresse.Wenn Sie weitere Informationen benötigen, besuchen Sie bitte den Help Center oder wenden Sie sich an die Unterstützung  : info@tanduu.com',
      },
    };
  }
  notverif: any = {
    languages: {
      name_en: 'Your account is not verified yet',
      name_fr: "Votre compte n'est pas encore vérifié",
      name_de: 'Ihr Email-Adresse ist noch nicht verifiziert',
    },
  };
  error: any = {
    languages: {
      name_en: 'Error',
      name_fr: 'Erreur',
      name_de: 'Fehler',
    },
  };
  vldkey: any = {
    languages: {
      name_en: 'the validation code',
      name_fr: 'le code de validation',
      name_de: 'Der eingebene Code',
    },
  };
  wrong: any = {
    languages: {
      name_en: 'you entred is wrong',
      name_fr: 'que vous avez saisi est erroné',
      name_de: 'ist nicht correct',
    },
  };
  notrecieved: any = {
    languages: {
      name_en: 'Mail not received ?',
      name_fr: 'Courrier non reçu ?',
      name_de: 'Mail nicht erhalten ?',
    },
  };
  resend: any = {
    languages: {
      name_en: 'Resened',
      name_fr: 'Renvoyer',
      name_de: 'erneut senden',
    },
  };
  pop1: any = {
    languages: {
      name_en: 'Verification code sent',
      name_fr: 'Code de verification envoyé',
      name_de: 'Bestätigungscode gesendet',
    },
  };
  pop2: any = {
    languages: {
      name_en: 'please verify your inbox or spam',
      name_fr: 'veuillez vérifier votre boîte de réception ou spam',
      name_de: 'Bitte überprüfen Sie Ihren Posteingang oder Spam',
    },
  };
  recievebox : any 
  resendverfication() {
    this.obj = localStorage.getItem('main');
    var id = JSON.parse(this.obj).id;
   
    var email = JSON.parse(this.obj).email;
    var username = JSON.parse(this.obj).username;
    var byphone = JSON.parse(this.obj).byphone;
    if(byphone){

    }
    this.authser.Resend_verification_link(id, byphone ).subscribe((data: any) => {
      this.resendverif = true;
      Swal.fire(
        this.pop1.languages[this.serviceLang],
        this.pop2.languages[this.serviceLang],
        'success'
      );
    });    
   
  
  }

  onOtpChange(a: any) {
    if (a.toString().length === 6) {
      var id = JSON.parse(this.obj).id;
      this.authser
        .verify_code_validity(id, a.toString())
        .subscribe((data: any) => {
          if (data.activated === true) {
            JSON.parse(this.obj).is_active = true;
            let data: any = JSON.parse(this.obj);
            data.is_active = true;
            localStorage.removeItem('main');

            localStorage.setItem('main', JSON.stringify(data));

            if (JSON.parse(this.obj).roles[0] == 'ROLE_ADMIN') {
              this.router.navigateByUrl('/admin/profile?settings=about-me').then((e: any) => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/']).then((e: any) => {
                window.location.reload();
              });
            }
          } else {
            this.showkeyerror = true;
            this.errormessage = data.message;
          }
        });
    }
  }
}
