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
export class CommercialsService {
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
  addcommercial(commercial: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/super-admin/commercials/add',
        commercial,
        httpOptionss
      )
      .pipe(retry(1));
  }

  updatecommercial(commercial: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/update',
        commercial,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcommercialbucommid(id: number): Observable<any> {
    var req: any = {
      commercial_id: id,
    };

    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/contract/identifier',
        req,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcommercialincomebyid(id: number): Observable<any> {
    var req: any = {
      commercial_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/income',
        req,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcommercialincometodaybyid(id: number): Observable<any> {
    var req: any = {
      commercial_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/incometoday',
        req,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcommercialbyid(id: number): Observable<any> {
    var req: any = {
      user_id: id,
    };

    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/user',
        req,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcommercialbycode(id: string): Observable<any> {
    var req: any = {
      code: id,
    };

    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/code',
        req,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallcommercials(): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .get<any>(UrlsService.backendUrl + '/api/commercials', this.httpOptions)
      .pipe(retry(1));
  }
}
