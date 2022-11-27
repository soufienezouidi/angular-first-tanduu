import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreRegisterPartnerComponent } from './pre-register-partner.component';

const routes: Routes = [{ path: '', component: PreRegisterPartnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreRegisterPartnerRoutingModule { }
