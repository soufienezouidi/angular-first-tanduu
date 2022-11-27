import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
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
  updatepage(page: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/pages/edit',
        page,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getpagebyname(namep: string): Observable<any> {
    var obj: any = {
      name: namep,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/pages/getbyname',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getdescriptionbycategid(namep: number): Observable<any> {
    var obj: any = {
      id: namep,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/descriptions/getbyid',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  adddescription(namep: any): Observable<any> {
  
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/descriptions/add',
        namep,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  updatedescription(namep: any): Observable<any> {
  
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/descriptions/edit',
        namep,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
