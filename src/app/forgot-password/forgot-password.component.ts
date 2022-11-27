import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

declare const $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  constructor(public authservice: AuthenticationService) {}
  forgot: any = {
    languages: {
      name_en: 'Forgot password ?',
      name_fr: 'Mot de passe oublié ?',
      name_de: 'Passwort vergessen ?',
    },
  };
  enter: any = {
    languages: {
      name_en: 'Enter your email to get a password reset link',
      name_fr:
        'Entrez votre email pour obtenir un lien de réinitialisation du mot de passe',
      name_de:
        'Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen des Passworts zu erhalten',
    },
  };
  reset: any = {
    languages: {
      name_en: 'Reset Password',
      name_fr: 'réinitialiser le mot de passe',
      name_de: 'Passwort zurücksetzen',
    },
  };
  remember: any = {
    languages: {
      name_en: 'Remember your password ?',
      name_fr: 'Rappelez-vous votre mot de passe?',
      name_de: 'Erinnerst du dich an dein Passwort?',
    },
  };
  modal: any = {
    languages: {
      name_en:
        'a reset link has been sent to ' +
        this.email +
        ' please click the recieved link  to continue',
      name_fr:
        'un lien de réinitialisation a été envoyé à ' +
        this.email +
        ' veuillez cliquer sur le lien reçu pour continuer',
      name_de:
        'ein Reset-Link wurde an gesendet ' +
        this.email +
        ' Bitte klicken Sie auf den erhaltenen Link, um fortzufahren',
    },
  };
  serviceLang: any;
  ngOnInit(): void {
    this.serviceLang = 'name_' + localStorage.getItem('language');
    if ($('.floating').length > 0) {
      $('.floating')
        .on('focus blur', function (e) {
          $(this)
            .parents('.form-focus')
            .toggleClass(
              'focused',
              e.type === 'focus' || this.value.length > 0
            );
        })
        .trigger('blur');
    }
  }
  errormail: boolean = false;
  sendforgetmail() {
    if (this.email) {
      this.errormail = false;
      this.authservice.forgot_password(this.email).subscribe((res) => {
        Swal.fire(
          this.reset.languages[this.serviceLang],
          this.modal.languages[this.serviceLang],
          'success'
        );
      });
    } else {
      this.errormail = true;
    }
  }
}
