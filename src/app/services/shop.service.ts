import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UrlsService } from 'src/app/globals/urls-common.service';

UrlsService.backendUrl;
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  //token: string = JSON.parse(localStorage.getItem('rest')).accessToken;

  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': ' this.token',
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

  // get all products & galeries
  getAllPorduct(userId: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/products',
      userId
    );
  }

  // get all products & galeries
  getAllGalleries(userId: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/gallery',
      userId
    );
  }

}
