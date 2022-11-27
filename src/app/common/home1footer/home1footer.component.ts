import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home1footer',
  templateUrl: './home1footer.component.html',
  styleUrls: ['./home1footer.component.css'],
})
export class Home1footerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToLink() {
    this.router.serializeUrl(this.router.createUrlTree(['/privacypolicy']));
    //window.open('http://localhost:4200/#/legalinfos', '_blank');
  }
}
