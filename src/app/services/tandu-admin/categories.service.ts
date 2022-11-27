import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesServices {
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
  uploadcategoryimage(foarmData: FormData) {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http.post<any>(
      UrlsService.backendUrl + '/api/tanduu_admin/categories/upload_picture',
      foarmData,
      httpOptionss
    );
  }
  uploadcategban(foarmData: FormData) {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http.post<any>(
      UrlsService.backendUrl + '/api/tanduu_admin/categories/uploadbanner',
      foarmData,
      httpOptionss
    );
  }
  uploadsubcategoryimage(foarmData: FormData) {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http.post<any>(
      UrlsService.backendUrl +
        '/api/tanduu_admin/sub-categories/upload_picture',
      foarmData,
      httpOptionss
    );
  }
  addcategory(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories/add',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  updatecategory(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories/updatecateg',
        categ,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  updateservice(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/services/updateservice',
        categ,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addsubcategory(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/sub-categories/add',
        categ,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addservicetosub(ser: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/services/add',
        ser,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  enabledisable(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories/enable',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }

  enabledisablesub(subcateg: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/sub-categories/enable',
        subcateg,
        httpOptionss
      )
      .pipe(retry(1));
  }
  enabledisableservice(serv: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/services/enable',
        serv,
        httpOptionss
      )
      .pipe(retry(1));
  }
  acceptcategory(categ: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };

    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories/accept',
        categ,
        httpOptionss
      )
      .pipe(retry(1));
  }
  getcategories(): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories',
        httpOptionss
      )
      .pipe(retry(1));
  }
  get_servicesBysubcategoriesid(id: number): Observable<any> {
    var obj: any = {
      sub_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/servicesbysub',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcategorybyid(id: number): Observable<any> {
    var obj: any = {
      categ_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/categories/getbyid',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallcategories() {
    return this.http
      .get<any>(UrlsService.backendUrl + '/api/tanduu_admin/categories')
      .pipe(retry(1));
  }
  get_subcategoriesByCategoryid(id: number): Observable<any> {
    var obj: any = {
      category_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/sub-categories',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  editservicebyid(v: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/services/edit',
        v,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  updatesubcategory(subcateg: any): Observable<any> {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl +
          '/api/tanduu_admin/sub-categories/updatesubcateg',
        subcateg,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallpendigrequests(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/services/all/pending',
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallsuggestions(): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/suggestions/getall',

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getsuggestionbyid(idd: number): Observable<any> {
    let obj: any = {
      id: idd,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/suggestions/identifier',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallservices(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/services/all',

        this.httpOptions
      )
      .pipe(retry(1));
  }
  updaterequest(obj: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/suggestions/update',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getservicekeywords(ud: number, ser: string): Observable<any> {
    let obj: any = {
      serviceId: ud,
      type: ser,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/services/keywords/service',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addkeywordstoservice(obj: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/services/keywords/create',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
