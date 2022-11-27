import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacypoliceComponent } from './privacypolice.component';

const routes: Routes = [{ path: '', component: PrivacypoliceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacypoliceRoutingModule { }
