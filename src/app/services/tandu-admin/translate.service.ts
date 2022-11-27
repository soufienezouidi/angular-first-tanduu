import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/globals/urls-common.service';

const baseUrl = 'https://api.aroundorder.com:1337/api';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl + '/api/tanduu_admin/translation');
  }

  get(id) {
    return this.http.get(`${UrlsService.backendUrl + '/api'}/${id}`);
  }

  create(data: any) {
    return this.http.post(
      UrlsService.backendUrl + '/api/tanduu_admin/translation/add',
      data
    );
  }
  getAllTexts() {
    return this.http.get(
      UrlsService.backendUrl + '/api/tanduu_admin/translation',
    );
  }
  getTextsByCRM() {
    return this.http.get(
      UrlsService.backendUrl + '/api/tanduu_admin/translation/crm',
    );
  }

  getTextsByCPlat() {
    return this.http.get(
      UrlsService.backendUrl + '/api/tanduu_admin/translation/plateform',
    );
  }

  update(data) {
    return this.http.post(UrlsService.backendUrl + '/api/tanduu_admin/translation/edit', data);
  }

  createBlog(data) {
    return this.http.post(
      UrlsService.backendUrl + '/api/tanduu_admin/blogs/add',
      data
    );
  }
}
