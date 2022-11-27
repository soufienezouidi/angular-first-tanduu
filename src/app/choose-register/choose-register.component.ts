import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-choose-register',
  templateUrl: './choose-register.component.html',
  styleUrls: ['./choose-register.component.css']
})
export class ChooseRegisterComponent implements OnInit {

  constructor(public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
  }

  ngOnInit(): void {
  }

}
