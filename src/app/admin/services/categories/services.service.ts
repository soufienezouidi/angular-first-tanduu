import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3NzU5OTA0LCJleHAiOjE2NDU1MzU5MDR9.vrqPk6RlIfVu8myZ7_3BnYTqRww8KeTB1Ffz_6IRO8w',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<any> {
    return this.http.get<any>(
      UrlsService.backendUrl + '/api/customers/services/all'
    );
  }
  getallServiceBySubCategories(data: any): Observable<any> {
    return this.http
      .post<any>(UrlsService.backendUrl + '/api/admin/all/services/sub', data)
      .pipe(retry(1));
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(
      // UrlsService.backendUrl + '/api/customers/categories'
      'https://api.aroundorder.com:1337/api/services/categories'
    );
  }

  getAllSubCategories(): Observable<any> {
    return this.http.get<any>(
      'https://api.aroundorder.com:1337/api/services/sub'
    );
  }

  getArchitectureCategories(): Observable<any> {
    return this.http.get<any>(
      'https://api.aroundorder.com:1337/api/admin/architecture/categories'
    );
  }

  getAllServicesBySub(): Observable<any> {
    return this.http.get<any>(
      'https://api.aroundorder.com:1337/api/services/all'
    );
  }

  createOrUpdateSource(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/customers/services/all/new-update',
      data
    );
  }

  UpdateSource(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/customers/services/all/update',
      data
    );
  }

  suggestNewCatg(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/suggest/service',
      data
    );
  }
}
