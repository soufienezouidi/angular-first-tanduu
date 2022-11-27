import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunServicesComponent } from './commun-services.component';

const routes: Routes = [{ path: '', component: CommunServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunServicesRoutingModule { }
