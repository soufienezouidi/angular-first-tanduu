import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { tanduu_adminguard } from '../globals/routingguard';
import { PharmacyAdminComponent } from './super-admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [tanduu_adminguard],
    component: PharmacyAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'categories',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'profile',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'products',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./products/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'add-product',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./products/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: 'edit-product',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./products/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: 'expired',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./products/expired/expired.module').then(
            (m) => m.ExpiredModule
          ),
      },
      {
        path: 'out-stock',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./products/out-stock/out-stock.module').then(
            (m) => m.OutStockModule
          ),
      },
      {
        path: 'purchase',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./purchase/purchase/purchase.module').then(
            (m) => m.PurchaseModule
          ),
      },
      {
        path: 'add-purchase',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./purchase/add-purchase/add-purchase.module').then(
            (m) => m.AddPurchaseModule
          ),
      },
      {
        path: 'edit-purchase',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./purchase/add-purchase/add-purchase.module').then(
            (m) => m.AddPurchaseModule
          ),
      },
      {
        path: 'orders',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./purchase/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'transactions',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'sales',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'supplier',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./supplier/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
      },
      {
        path: 'add-branch',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./supplier/add-supplier/add-supplier.module').then(
            (m) => m.AddSupplierModule
          ),
      },
      {
        path: 'invoice',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'invoice-reports',
        loadChildren: () =>
          import('./invoice-reports/invoice-reports.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },
      {
        path: 'settings',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'express-services',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./express-services/express-services.module').then(
            (m) => m.ExpressServicesModule
          ),
      },
      {
        path: 'blog',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./blog/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'blog-details/:id',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./blog/blog-details/blog-details.module').then(
            (m) => m.BlogDetailsModule
          ),
      },
      {
        path: 'add-blog',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./blog/add-blog/add-blog.module').then(
            (m) => m.AddBlogModule
          ),
      },
      {
        path: 'pending-blog',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./blog/pending-blog/pending-blog.module').then(
            (m) => m.PendingBlogModule
          ),
      },
      {
        path: 'edit-blog',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./blog/edit-blog/edit-blog.module').then(
            (m) => m.EditBlogModule
          ),
      },
      {
        path: 'specialities',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./commercials/specialities.module').then(
            (m) => m.SpecialitiesModule
          ),
      },
      {
        path: 'sub-categories',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./sub-categories/sub-categories.module').then(
            (m) => m.SubCategoriesModule
          ),
      },
      {
        path: 'servicess',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./servicess/services.module').then((m) => m.ServicesModule),
      },
      {
        path: 'add-li',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./tos/legalinformations/add-li.module').then(
            (m) => m.AddLegalInformationsModule
          ),
      },
      {
        path: 'add-pp',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./aboutus/add-li.module').then(
            (m) => m.AddLegalInformationsModule
          ),
      },
      {
        path: 'add-ct',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./tos/termsforcustomers/add-li.module').then(
            (m) => m.AddLegalInformationsModule
          ),
      },
      {
        path: 'add-jt',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./tos/termsforjobbers/add-li.module').then(
            (m) => m.AddLegalInformationsModule
          ),
      },
      /* translate */
      {
        path: 'translate',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./translate/translate.module').then((m) => m.TranslateModule),
      },
      {
        path: 'aboutus',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./aboutus/add-li.module').then(
            (m) => m.AddLegalInformationsModule
          ),
      },
     
      {
        path: 'requestcheck/:id',
        canActivate: [tanduu_adminguard],
        loadChildren: () =>
          import('./requestcheck/requestcheck.module').then(
            (m) => m.RequestcheckModule
          ),
      },
      { path: 'categdescs', canActivate: [tanduu_adminguard], loadChildren: () => import('./categdescs/categdescs.module').then(m => m.CategdescsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [tanduu_adminguard],
  exports: [RouterModule],
})
export class PharmacyAdminRoutingModule {}
