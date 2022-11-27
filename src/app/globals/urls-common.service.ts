import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  static backendUrl = 'https://api.aroundorder.com:1337';
  //static backendUrl = 'http://api.aroundorder.com:1337';
  constructor() { }
}
