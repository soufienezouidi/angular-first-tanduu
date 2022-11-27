import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getservicekeywords(ud: number, ser: string): Observable<any> {
    let obj: any = {
      referenceId: ud,
      type: ser,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/words/reference',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
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
  getcompanybyid(ida: number): Observable<any> {
    var users: any = {
      user_id: ida,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/companyid',
        users,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getCompanyUser(data: any) {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/company',
      data,
      this.httpOptions
    );
  }
  getAllcompaniesbyid(ida: number[]): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/all/companies',
        ida,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcompanybyusername(name: string): Observable<any> {
    let obj: any = {
      company_link: name,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/company/username',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getserviesbycompany(ida: number): Observable<any> {
    let obj: any = {
      companyId: ida,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/services/company',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcompaniesbyserviceandlocation(
    services: number[],
    zip: number
  ): Observable<any> {
    var users: any = {
      services: services,
      city: zip,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/locations/filter',
        users,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addcommcompcontract(commercial_id: number, client: any): Observable<any> {
    var contr: any = {
      client: client,
      commercial_id: commercial_id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/commercials/contract/add',
        contr,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcompanylocationsandservices(id: number): Observable<any> {
    var com: any = {
      companyId: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customer/location/getbycompid',
        com,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  getCompaniesByCity(services: number[], city: string): Observable<any> {
    var users: any = {
      services: services,
      city: city,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/locations/filter/city',
        users,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  gelallcitycompanies(city: string): Observable<any> {
    var users: any = {
      city: city,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/locations/allpartners/city',
        users,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcompaniesbyuserid(id: any): Observable<any> {
    var users: any = {
      user_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/admin/company/all',
        users,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addkeywordsautoforcompany(
    a: any,
    id: number,
    type: string,
    obj: any
  ): Observable<any> {
    let far: any[] = [];

    a.forEach((element) => {
      let obj: any = {
        text: element,
        is_accepted: 1,
        is_deleted: 0,
        is_dafault: true,
      };
      far.push(obj);
    });
    var userkeywords: any = {
      list_words: far,
      referenceId: id,
      type: type,
      object: obj,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/words/add',
        userkeywords,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
