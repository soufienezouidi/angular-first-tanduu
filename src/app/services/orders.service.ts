import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3MzA5NjM4LCJleHAiOjE2NDUwODU2Mzh9.V8Gn2d4NY4C-vlZ9zMyVyt7O3IYpUJYa3G4dmAu9QJU',
    }),
  };
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  sendjobrequest(job: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/orders/send',
        job,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getordersbycustomer(id: number): Observable<any> {
    var cus: any = {
      idcus: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/orders/getbysender',
        cus,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getorderbycustomerandjobber(id: number, idj: number): Observable<any> {
    var cus: any = {
      idcus: id,
      idjob: idj,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl +
          '/api/customers/orders/getby_sender_and_jobber',
        cus,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcustomerbyuserid(id: number): Observable<any> {
    var cus: any = {
      user_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/customer/getbyuser',
        cus,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getorderByid(id: number): Observable<any> {
    var cus: any = {
      id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/orders/getbyid',
        cus,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getservicesorderid(id: number): Observable<any> {
    var cus: any = {
      order_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/customer/getorderservices',
        cus,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
