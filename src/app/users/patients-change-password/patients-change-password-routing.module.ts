import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsChangePasswordComponent } from './patients-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsChangePasswordRoutingModule { }
