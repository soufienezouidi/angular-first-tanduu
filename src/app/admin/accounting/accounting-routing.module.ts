import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';

const routes: Routes = [
  { path: '', component: AccountingComponent },
    {
    path: 'cashbook',
    loadChildren: () =>
    import('./cashbook/cashbook.module').then((m) => m.CashbookModule),
  },
  {
    path: 'balancing-list',
    loadChildren: () =>
    import('./balancing-list/balancing-list.module').then((m) => m.BalancingListModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
