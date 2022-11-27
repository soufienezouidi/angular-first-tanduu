import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  getuserbyid(idb: number): Observable<any> {
    var bl: any = {
      id: idb,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/user/identifier',
        bl,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getfiletrans(): Observable<any> {
    var bl: any = {
      filename: 'fr',
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/translation/getfilecontent',
        bl,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  updateUser(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/update',
      data,
      this.httpOptions
    );
  }
}
