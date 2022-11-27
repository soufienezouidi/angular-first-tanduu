import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestcheckComponent } from './requestcheck.component';

const routes: Routes = [{ path: '', component: RequestcheckComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestcheckRoutingModule { }
