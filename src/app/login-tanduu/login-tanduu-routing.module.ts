import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginTanduuComponent } from './login-tanduu.component';

const routes: Routes = [{ path: '', component: LoginTanduuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginTanduuRoutingModule { }
