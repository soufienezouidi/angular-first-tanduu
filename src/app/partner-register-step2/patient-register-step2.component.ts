import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-register-step2',
  templateUrl: './patient-register-step2.component.html',
  styleUrls: ['./patient-register-step2.component.css'],
})
export class PatientRegisterStep2Component implements OnInit {
  constructor(private router: Router) {}
  name: string;
  gotosteptwo() {
    this.router.navigateByUrl('/step-two');
  }
  gotostepone() {
    this.router.navigateByUrl('/step-one');
  }

  ngOnInit(): void {}
  gotostepthree() {
    this.router.navigateByUrl('/step-three');
  }
}
