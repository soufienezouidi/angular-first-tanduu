import { Component, OnInit } from '@angular/core';
import { CommercialsService } from 'src/app/services/tandu-admin/commercials.service';
declare var $: any;
declare var selection: any;
declare var valueKey: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private commercialserv: CommercialsService) {}
  oldpassword: string;
  newpass1: string;
  newpass2: string;
  user: any;
  infos: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('main'));
    this.commercialserv
      .getcommercialbyid(JSON.parse(localStorage.getItem('main')).id)
      .subscribe((e: any) => {
        this.infos = e;
      });
  }
  resetpassword() {
    if (this.oldpassword === this.infos.password) {
      if (this.newpass1 != null && this.newpass2 == this.newpass1) {
      } else {
      }
    } else {
    }
  }
  changeinfos() {}
  phoneedit: boolean = false;
  focusFunction() {
    this.phoneedit = !this.phoneedit;
  }
}
