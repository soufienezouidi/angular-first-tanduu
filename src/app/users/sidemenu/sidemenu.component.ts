import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name;
  constructor(
    private router: Router,
    public commonService: CommonServiceService
  ) {}

  connecteduser;
  ngOnInit(): void {
    this.connecteduser = JSON.parse(localStorage.getItem('main'));
    this.connecteduser.location = JSON.parse(this.connecteduser.location);
  }

  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/']);
  }

  navigate(name) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}
