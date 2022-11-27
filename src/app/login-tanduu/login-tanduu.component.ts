import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../services/tandu-admin/authenticate.service';

@Component({
  selector: 'app-login-tanduu',
  templateUrl: './login-tanduu.component.html',
  styleUrls: ['./login-tanduu.component.css'],
})
export class LoginTanduuComponent implements OnInit {
  constructor(
    public router: Router,
    private toastr: ToastrService,
    private superadmin: AuthenticateService
  ) {}
  username = '';
  password = '';
  ngOnInit(): void {}
  login2() {
    if (this.username == '') {
      this.toastr.error('', 'Email required!');
    } else {
      if (this.password == '') {
        this.toastr.error('', 'password  is mandatory!');
      } else {
        this.superadmin
          .login(this.username, this.password)
          .subscribe((data: {}) => {
            var tmp: any = data;
            if (!tmp.loggingin) {
              this.toastr.error('', tmp.message);
            } else {
              if (tmp.roles[0] == 'ROLE_TANDUU_ADMIN') {
                localStorage.setItem('main', JSON.stringify(data));
                localStorage.setItem('sc', data['accessToken']);
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/tanduu-admin').then(() => {
                  window.location.reload();
                });
              }
            }
          });
      }
    }
  }
}
