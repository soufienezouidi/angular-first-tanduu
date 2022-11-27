import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapGridComponent } from './partners-search.component';

const routes: Routes = [
  {
    path: '',
    component: MapGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapGridRoutingModule {}
