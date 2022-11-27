import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersReceivedComponent } from './orders-received.component';

const routes: Routes = [
  { path: '', component: OrdersReceivedComponent },
  { path: 'view-order',
      loadChildren: () =>
      import('./view-order/view-order.module').then((m) => m.ViewOrderModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersReceivedRoutingModule { }
