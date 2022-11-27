import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressservicesService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getexpressservices() {
    return this.http
      .get<any>(UrlsService.backendUrl + '/api/customers/express-services')
      .pipe(retry(1));
  }
}
