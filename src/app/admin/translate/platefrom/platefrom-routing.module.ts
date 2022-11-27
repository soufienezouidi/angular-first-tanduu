import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatefromComponent } from './platefrom.component';

const routes: Routes = [{ path: '', component: PlatefromComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatefromRoutingModule { }
