import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-patient-register-step4',
  templateUrl: './patient-register-step4.component.html',
  styleUrls: ['./patient-register-step4.component.css'],
})
export class PatientRegisterStep4Component implements OnInit {
  allcategs: any[] = [{ id: 1 }];
  constructor(public router: Router, public categservices: CategoriesService) {}
  gotosteptwo() {
    this.router.navigateByUrl('/step-two');
  }
  gotostepone() {
    this.router.navigateByUrl('/step-one');
  }

  ngOnInit(): void {}
}
