import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountVerificationComponent } from './account-verification.component';

const routes: Routes = [{ path: '', component: AccountVerificationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountVerificationRoutingModule { }
