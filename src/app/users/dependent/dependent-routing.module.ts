import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependentComponent } from './dependent.component';

const routes: Routes = [{ path: '', component: DependentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependentRoutingModule { }
