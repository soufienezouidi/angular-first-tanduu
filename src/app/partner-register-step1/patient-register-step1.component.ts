import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-register-step1',
  templateUrl: './patient-register-step1.component.html',
  styleUrls: ['./patient-register-step1.component.css'],
})
export class PatientRegisterStep1Component implements OnInit {
  constructor(private router: Router) {}
  gotosteptwo() {
    this.router.navigateByUrl('/step-two');
  }
  gotostepone() {
    this.router.navigateByUrl('/step-one');
  }
  ngOnInit(): void {}
}
