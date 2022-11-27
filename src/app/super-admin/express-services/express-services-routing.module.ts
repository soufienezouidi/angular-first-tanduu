import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpressServicesComponent } from './express-services.component';

const routes: Routes = [{ path: '', component: ExpressServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressServicesRoutingModule { }
