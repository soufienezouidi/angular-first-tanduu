import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UrlsService } from 'src/app/globals/urls-common.service';

const baseUrl = 'https://api.aroundorder.com:1337/api/admin/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3NzU5OTA0LCJleHAiOjE2NDU1MzU5MDR9.vrqPk6RlIfVu8myZ7_3BnYTqRww8KeTB1Ffz_6IRO8w',
    }),
  };

  constructor(private http: HttpClient) {}

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

  getAllMemebers(company_id: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/team',
      company_id
    );
  }

  createOrUpdateInformation(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/team/new-update',
      data
    );
  }

  UpdateInformation(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/team/update',
      data
    );
  }
}
