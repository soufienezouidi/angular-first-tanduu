import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home7header',
  templateUrl: './home7header.component.html',
  styleUrls: ['./home7header.component.css'],
})
export class Home7headerComponent implements OnInit {
  infos: any;
  constructor() {}
  auth: boolean = false;
  userconnected: any;
  ngOnInit() {
    this.userconnected = localStorage.getItem('main');

    if (this.userconnected != null) {
      if (JSON.parse(this.userconnected).user) {
        this.infos = JSON.parse(this.userconnected).user;
      } else {
        this.infos = JSON.parse(this.userconnected);
      }

      if (JSON.parse(this.userconnected)) {
        this.auth = true;
      }
    }
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
