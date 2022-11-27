import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UrlsService } from 'src/app/globals/urls-common.service';

const baseUrl = 'https://api.aroundorder.com:1337/api/admin';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
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

  httpOptions = {
    headers: new HttpHeaders({}),
  };

  getCompanyUser(data: any) {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/company',
      data,
      this.httpOptions
    );
  }

  updateCompany(data: any) {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/update',
      data,
      this.httpOptions
    );
  }
  switchToCompany(code: any): Observable<any> {
    return this.http.post<any>(UrlsService.backendUrl + '/getlog', code);
  }

  getAccessKeyByUser(userId: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/access/user',
      userId
    );
  }

  getPrivilgesByUser(userId: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/privileges/user',
      userId
    );
  }

  getUserById(userId: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/identifier',
      userId,
      this.httpOptions
    );
  }

  getKeywordsByCompanies(reference: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/words/reference',
      reference,
      this.httpOptions
    );
  }
  createkeywords(obj: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/words/add',
      obj,
      this.httpOptions
    );
  }

  updateUser(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/update',
      data,
      this.httpOptions
    );
  }

  updateUserSecurity(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/account/update-password',
      data,
      this.httpOptions
    );
  }

  getAllLocations(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/locations',
      data,
      this.httpOptions
    );
  }

  getLocationById(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/locations/identifier',
      data,
      this.httpOptions
    );
  }

  updateLocation(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/locations/edit',
      data,
      this.httpOptions
    );
  }

  updateLocationServices(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/locations/services/add',
      data,
      this.httpOptions
    );
  }

  addLocation(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/locations/add',
      data,
      this.httpOptions
    );
  }
  uploadUserProfilepic(foarmData: FormData) {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/user/upload_file',
      foarmData,
      this.httpOptions
    );
  }
}
