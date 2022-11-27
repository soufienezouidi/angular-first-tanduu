import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/globals/urls-common.service';

const baseUrl = 'https://api.aroundorder.com:1337/api';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(baseUrl + '/api/tanduu_admin/translation');
  }

  get(id) {
    return this.http.get(`${UrlsService.backendUrl + '/api'}/${id}`);
  }

  create(data) {
    return this.http.post(
      UrlsService.backendUrl + '/api/tanduu_admin/translation/add',
      data
    );
  }

  update(id, data) {
    return this.http.put(`${UrlsService.backendUrl + '/api'}/${id}`, data);
  }

  createBlog(data) {
    return this.http.post(
      UrlsService.backendUrl + '/api/tanduu_admin/blogs/add',
      data
    );
  }
}
