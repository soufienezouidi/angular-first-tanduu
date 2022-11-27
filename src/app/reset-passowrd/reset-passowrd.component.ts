import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-passowrd',
  templateUrl: './reset-passowrd.component.html',
  styleUrls: ['./reset-passowrd.component.css'],
})
export class ResetPassowrdComponent implements OnInit {
  token: string;
  email: string;
  canchange: boolean = true;
  repassword: string;
  password: string;
  constructor(
    public route: ActivatedRoute,
    public authserv: AuthenticationService,
    public router: Router
  ) {}
  sendforgetmail() {
    this.authserv
      .change_password(this.password, this.email, this.token)
      .subscribe((res: any) => {
        if (res['reset'] == true) {
          this.router.navigate(['/login-page']);
        }
      });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.token = this.route.snapshot.queryParamMap.get('token');
      this.email = this.route.snapshot.queryParamMap.get('email');
      this.authserv.checklink(this.token, this.email).subscribe((res: any) => {
        this.canchange = res['change'];
      });
    });
  }
}
