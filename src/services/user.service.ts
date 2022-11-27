import { E, P } from '@angular/cdk/keycodes';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TokensService {
  apiURL = 'https://api.aroundorder.com:1337';
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  login(a: string, b: string): Observable<any> {
    var obj: any = {
      username: 'lengliz kaisaaa',
      email: 'lengliz@tunafanyaaa.com',
      is_active: 1,
      password: '123456',
      First_name: 'kais',
      last_name: 'lengliz',
      verified: 1,
    };
    return this.http
      .post<any>(
        'https://api.aroundorder.com:1337/api/auth/signup',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  handleError(handleError: any): import('rxjs').OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }
}
