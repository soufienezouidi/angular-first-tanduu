import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressService {
  apik: string = '';
  constructor(private http: HttpClient) {
    this.apik = localStorage.getItem('sc');
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.apik,
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
  uploadexpressimage(foarmData: FormData) {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http.post<any>(
      UrlsService.backendUrl +
        '/api/tanduu_admin/quick_services/upload_picture',
      foarmData,
      httpOptionss
    );
  }
  addexpress(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/express/add',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  upadateexpress(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/express/enable',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  editexpress(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/express/updateexpress',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  acceptexpress(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/express/accept',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  getexpresslist(): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': this.apik,
      }),
    };
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/express',
        httpOptionss
      )
      .pipe(retry(1));
  }
}
