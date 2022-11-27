import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunServicesListComponent } from './commun-services-list.component';

const routes: Routes = [{ path: '', component: CommunServicesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunServicesListRoutingModule { }
