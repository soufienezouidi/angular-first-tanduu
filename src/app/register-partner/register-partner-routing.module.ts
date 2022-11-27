import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPartnerComponent } from './register-partner.component';

const routes: Routes = [{ path: '', component: RegisterPartnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPartnerRoutingModule {}
