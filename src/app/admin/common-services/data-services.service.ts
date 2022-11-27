import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { InformationsService } from '../services/orders/informations/informations.service';
import { SourcesService } from '../services/orders/sources/sources.service';
const baseUrl = 'https://api.aroundorder.com:1337/api/admin';

@Injectable({
  providedIn: 'root',
})
export class DataServicesService {
  public informations: any;
  public sources: any = [];

  constructor(
    public informationsService: InformationsService,
    public sourcesService: SourcesService,
    private http: HttpClient
  ) {}

  getCompanyConnected(user_id: any): Observable<any> {
    return this.http.post<any>(baseUrl + '/company', user_id);
  }
}
