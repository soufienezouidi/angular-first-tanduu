import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
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
  getallusers(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/users',

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallpartners(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/partners',

        this.httpOptions
      )
      .pipe(retry(1));
  }
}
