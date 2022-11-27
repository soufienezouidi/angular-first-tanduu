import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(email: string, passowrd: string): Observable<any> {
    var usercredentials: any = {
      login: email,
      password: passowrd,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/signin',
        usercredentials,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  RegisterCustomer(
    f: string,
    l: string,
    e: string,
    p: string
  ): Observable<any> {
    var obj: any = {
      email: e,
      is_active: 0,
      password: p,
      first_name: f,
      last_name: l,
      is_verified: 0,
      roles: ['customer'],
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/signup',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  RegisterPartner(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    isagency: boolean,
    iscom: boolean,
    comid: number,
    phone : string,
    userphone : string

  ): Observable<any> {
    var obj: any = {
      email: email,
      is_active: 0,
      verified: 0,
      password: password,
      first_name: first_name,
      last_name: last_name,
      roles: ['admin'],
      is_commercial: iscom,
      commercial_id: comid,
      is_agency: isagency,
      username : userphone,
      phone : phone
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/signup',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  RegisterPartnerandcomm(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    commid: number,
    isagency: boolean
  ): Observable<any> {
    var obj: any = {
      email: email,
      is_active: 0,
      verified: 0,
      password: password,
      first_name: first_name,
      last_name: last_name,
      roles: ['admin'],
      is_commercial: true,
      commercial_id: commid,
      is_agency: isagency,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/signup',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  Resend_verification_link(id: number,  byphone : boolean ) : Observable<any> {
    var obj: any = {
      id: id,
      byphone  : byphone
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/reset-token',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  Reset_password(id: number, email: string): Observable<any> {
    var obj: any = {
      id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/reset-token',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  verify_code_validity(id: number, code: string): Observable<any> {
    var obj: any = {
      id: id,
      code: code,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/account-confirmation',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  change_password(
    password: string,
    email: string,
    token: any
  ): Observable<any> {
    var obj: any = {
      new_password: password,

      email: email,
      token: token,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/reset-password',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  forgot_password(email: string): Observable<any> {
    var obj: any = {
      email: email,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/auth/forget-password',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  checklink(token: string, email: string): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl +
          '/api/auth/reset-password?token=' +
          token +
          '&email=' +
          email,

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getuserbyid(id: number): Observable<any> {
    var t: any = {
      id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/user/identifier',
        t,
        this.httpOptions
      )
      .pipe(retry(1));
  }
 
  logout(data: any) {
    return this.http.post(UrlsService.backendUrl + '/api/auth/logout', data);
  }
}
