import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersSentComponent } from './orders-sent.component';

const routes: Routes = [
  { path: '', component: OrdersSentComponent },
  {
    path: 'view-order',
    loadChildren: () =>
      import('./view-order/view-order.module').then((m) => m.ViewOrderModule),
  },
  {
    path: 'edit-order',
    loadChildren: () =>
      import('./edit-order/edit-order.module').then((m) => m.EditOrderModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersSentRoutingModule { }
