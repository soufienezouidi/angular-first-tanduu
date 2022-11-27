import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TanduuProComponent } from './tanduu-pro.component';

const routes: Routes = [{ path: '', component: TanduuProComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanduuProRoutingModule { }
