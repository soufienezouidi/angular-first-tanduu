import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../services/authentication.service';
import { CommercialsService } from '../services/tandu-admin/commercials.service';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name = '';
  toschecked: boolean = false;
  email = '';
  password = '';
  firstname = '';
  lastname = '';
  repassword = '';
  isPatient: boolean = true;
  doctors: any = [];
  patients: any = [];
  reg_type = 'Patient Register';
  doc_patient = 'Are you a Doctor?';
  redirecTo: any;
  constructor(
    private toastr: ToastrService,
    public authserv: AuthenticationService,
    public commserv: CommercialsService,
    public coomser: CommercialsService,
    public router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
  }

  ngOnInit(): void {
    window.scroll(0, 0);
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

  changeRegType() {
    if (this.reg_type === 'Doctor Register') {
      this.reg_type = 'Patient Register';
      this.doc_patient = 'Are you a Doctor?';
      this.isPatient = true;
    } else {
      this.reg_type = 'Doctor Register';
      this.doc_patient = 'Not a Doctor?';
      this.isPatient = false;
    }
  }
  errortanduu: any = {
    languages: {
      name_en:
        'The word (Tanduu ) is not allowed to be used in any personal information',
      name_fr:
        "mot (Tanduu) n'est pas autorisé à être utilisé dans les informations personnelles",
      name_de:
        'Das Wort (Tanduu) darf nicht in personenbezogenen Daten verwendet werden',
    },
  };
  register() {
    if (this.toschecked == true) {
      let params = {
        id: this.doctors.length + 1,
        doctor_name: this.name,
        password: this.password,
      };

      this.authserv
        .RegisterCustomer(
          this.firstname,
          this.lastname,
          this.email,
          this.password
        )
        .subscribe((res: any) => {
          /*  this.toastr.success('', 'Register successfully!');
          this.router.navigate(['/doctor-register-step1']);*/

          if (res.registred == true) {
            this.authserv
              .login(this.email, this.password)
              .subscribe((data: any) => {
                var tmp: any = data;
                if (!tmp.loggingin) {
                  this.toastr.error('', tmp.message);
                } else {
                  if (tmp.is_active == false) {
                    localStorage.setItem('main', JSON.stringify(data));
                    let object = {
                      accessToken: tmp.accessToken,
                      rest_id: tmp.id,
                      session_key: tmp.session_key,
                      full_name: tmp.first_name + ' ' + tmp.last_name,
                    };
                    localStorage.setItem('rest', JSON.stringify(object));
                    localStorage.setItem('switched', String(0));
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/').then(() => {
                      window.location.reload();
                    });
                    this.router
                      .navigateByUrl('/account_verification')
                      .then(() => {
                        window.location.reload();
                      });
                  } else {
                    localStorage.setItem('main', JSON.stringify(data));

                    //console.log(data);
                    let object = {
                      accessToken: tmp.accessToken,
                      rest_id: tmp.id,
                      session_key: tmp.session_key,
                      full_name: tmp.first_name + ' ' + tmp.last_name,
                    };
                    localStorage.setItem('rest', JSON.stringify(object));
                    localStorage.setItem('switched', String(0));

                    if (tmp.roles[0] == 'ROLE_ADMIN') {
                      this.router.navigateByUrl('/admin/dashboard').then(() => {
                        window.location.reload();
                      });
                    } else {
                      if (tmp.roles[0] == 'ROLE_COMMERCIAL') {
                        this.coomser
                          .getcommercialbyid(tmp.id)
                          .subscribe((datac: {}) => {
                            let object = {
                              accessToken: tmp.accessToken,
                              rest_id: tmp.id,
                              session_key: tmp.session_key,
                              full_name: tmp.first_name + ' ' + tmp.last_name,
                            };
                            localStorage.setItem('main', JSON.stringify(datac));
                            localStorage.setItem(
                              'rest',
                              JSON.stringify(object)
                            );
                            localStorage.setItem('switched', String(0));
                            this.router
                              .navigateByUrl('/commercial/dashboard')
                              .then(() => {
                                window.location.reload();
                              });
                          });
                      } else {
                        this.router.navigateByUrl('/').then(() => {
                          window.location.reload();
                        });
                      }
                    }
                  }
                }
              });
          } else {
          }
        });
    } else {
      this.toastr.error('', 'TOS must be accepted!');
    }
  }

  getpatients() {}
}
