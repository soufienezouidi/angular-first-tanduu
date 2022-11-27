import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInvoiceComponent } from './admin-invoice.component';

const routes: Routes = [
	{
		path : '',
		component : AdminInvoiceComponent
	},
	{
        path: 'new-invoice',
        loadChildren: () =>
          import('./new-invoice/new-invoice.module').then(
            (m) => m.NewInvoiceModule
          ),
  },
	{
        path: 'view',
        loadChildren: () =>
          import('./view-invoice/view-invoice.module').then(
            (m) => m.ViewInvoiceModule
          ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInvoiceRoutingModule { }
