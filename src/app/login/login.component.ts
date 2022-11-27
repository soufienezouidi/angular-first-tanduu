import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CommercialsService } from './../services/tandu-admin/commercials.service';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  username = '';
  password = '';
  form: FormGroup;
  placeholderSignup: any = {
    name_en: 'email address or phone number',
    name_fr: 'adresse e-mail ou numéro de téléphone',
    name_de: 'E-Mail-Adresse oder Telefonnummer',
  };

  redirecTo: any;
  constructor(
    public tss: AuthenticationService,
    public router: Router,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private coomser: CommercialsService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));

    this.username = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.validatorPassword]],
    });
  }
  validatorPassword(fc: FormControl) {
    const value = fc.value as string;
    const isInvalid = 'password' === value.trim().toLowerCase();
    return isInvalid
      ? { passwordError: 'Password is not a strong password' }
      : null;
  }
  submitForm() {
    if (this.form.valid) {
    } else {
    }
  }
  serviceLang: any;
  ngOnInit(): void {
    this.serviceLang = 'name_' + localStorage.getItem('language');
    window.scroll(0, 0);
    // get redirection link if exist
    this.redirecTo = localStorage.getItem('redirect');
    // Floating Label
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
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('redirect');
  }

  checkType(event) {
    this.isPatient = event.target.checked ? true : false;
  }
  login2() {
    if (this.username == '') {
      this.toastr.error('', 'Email required!');
    } else {
      if (this.password == '') {
        this.toastr.error('', 'password  is mandatory!');
      } else {
        this.tss.login(this.username, this.password).subscribe((data: {}) => {
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
              this.router.navigateByUrl('/account_verification').then(() => {
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
                      localStorage.setItem('main', JSON.stringify(data));
                      localStorage.setItem('rest', JSON.stringify(object));
                      localStorage.setItem('switched', String(0));
                      this.router
                        .navigateByUrl('/commercial/dashboard')
                        .then(() => {
                          window.location.reload();
                        });
                    });
                } else{
                  if (tmp.roles[0] == 'ROLE_TANDUU_ADMIN') {
                    localStorage.setItem('main', JSON.stringify(data));
                    localStorage.setItem('sc', data['accessToken']);
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/tanduu-admin').then(() => {
                      window.location.reload();
                    });
                  }
                }
                
              
              }
            }
          }
          
        });
      }
    }
  }
  fieldTextType: boolean;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  login() {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('patient', this.isPatient.toString());
    if (this.isPatient) {
      let filter = this.patients.filter(
        (a) => a.name == this.username && a.password === this.password
      );
      if (filter.length != 0) {
        localStorage.setItem('id', filter[0]['id']);
        this.toastr.success('', 'Login success!');
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });

        window.location.href = '/patients/dashboard';
      } else {
        this.toastr.error('', 'Login failed!');
      }
    } else {
      let filter = this.doctors.filter(
        (a) => a.doctor_name === this.username && a.password === this.password
      );
      if (filter.length != 0) {
        this.toastr.success('', 'Login success!');

        localStorage.setItem('id', filter[0]['id']);
      } else {
        this.toastr.error('', 'Login failed!');
      }
    }
  }
}
