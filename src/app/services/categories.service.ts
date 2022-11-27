import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getallcategories() {
    return this.http
      .get<any>(UrlsService.backendUrl + '/api/customers/categories')
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
  getcategorybyid(id: number): Observable<any> {
    var obj: any = {
      category_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/categories/getbyid',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcategorybyname(id: string): Observable<any> {
    var obj: any = {
      name: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/categories/getbyname',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getservicebyid(id: number): Observable<any> {
    var obj: any = {
      id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/services/getone',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcategorieswithinfos(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/admin/architecture/categories',
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getcategorieswithinfosadmin(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/admin/architecture/categories',
        this.httpOptions
      )
      .pipe(retry(1));
  }
  get_servicesBysubcategoriesid(id: number): Observable<any> {
    var obj: any = {
      sub_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/services',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  getServicesByCategoryId(id: number): Observable<any> {
    var obj: any = {
      category_id: id,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/services/category',
        obj,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  suggestcategory(cat: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/partner/suggest',
        cat,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getownsuggestions(cat: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/partner/getownsuggestions',
        cat,
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
}
