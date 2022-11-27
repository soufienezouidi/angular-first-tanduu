import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancingListComponent } from './balancing-list.component';

const routes: Routes = [
  { path: '', component: BalancingListComponent },
    {
    path: 'view',
    loadChildren: () =>
    import('./view-balance/view-balance.module').then((m) => m.ViewBalanceModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalancingListRoutingModule { }
