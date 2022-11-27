import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateformComponent } from './plateform.component';

const routes: Routes = [{ path: '', component: PlateformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateformRoutingModule { }
