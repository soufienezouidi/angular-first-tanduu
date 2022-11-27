import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Routingguard } from '../globals/routingguard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [Routingguard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'forgot-pass',
        canActivate: [Routingguard],
        loadChildren: () =>
          import(
            './pages/authendication/forgot-password/forgot-password.module'
          ).then((m) => m.ForgotPasswordModule),
      },
      {
        path: 'login',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/authendication/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'invoices',

        canActivate: [Routingguard],
        loadChildren: () =>
          import('./invoice/admin-invoice.module').then(
            (m) => m.AdminInvoiceModule
          ),
      },
      {
        path: 'articles',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./articles/articles.module').then((m) => m.ArticlesModule),
      },
      {
        path: 'files-management',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./files-management/files-management.module').then(
            (m) => m.FilesManagementModule
          ),
      },
      {
        path: 'profile',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'lock-screen',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/authendication/lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule
          ),
      },
      {
        path: 'register',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/authendication/regiser/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'blank-page',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'error-first',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/error-pages/error-first/error-first.module').then(
            (m) => m.ErrorFirstModule
          ),
      },
      {
        path: 'error-second',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pages/error-pages/error-second/error-second.module').then(
            (m) => m.ErrorSecondModule
          ),
      },
      {
        path: 'components',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./ui-interface/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'basic-input',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./ui-interface/forms/basic-inputs/basic-inputs.module').then(
            (m) => m.BasicInputsModule
          ),
      },
      {
        path: 'form-validation',
        canActivate: [Routingguard],
        loadChildren: () =>
          import(
            './ui-interface/forms/form-validation/form-validation.module'
          ).then((m) => m.FormValidationModule),
      },
      {
        path: 'horizondal-form',
        canActivate: [Routingguard],
        loadChildren: () =>
          import(
            './ui-interface/forms/horizondal-form/horizondal-form.module'
          ).then((m) => m.HorizondalFormModule),
      },
      {
        path: 'input-groups',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./ui-interface/forms/input-groups/input-groups.module').then(
            (m) => m.InputGroupsModule
          ),
      },
      {
        path: 'vertical-form',
        canActivate: [Routingguard],
        loadChildren: () =>
          import(
            './ui-interface/forms/vertical-form/vertical-form.module'
          ).then((m) => m.VerticalFormModule),
      },
      {
        path: 'form-mask',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./ui-interface/forms/form-mask/form-mask.module').then(
            (m) => m.FormMaskModule
          ),
      },
      {
        path: 'basic-tables',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./ui-interface/tables/basic-tables/basic-tables.module').then(
            (m) => m.BasicTablesModule
          ),
      },
      {
        path: 'admin-data-table',
        canActivate: [Routingguard],
        loadChildren: () =>
          import(
            './ui-interface/tables/admin-data-table/admin-data-table.module'
          ).then((m) => m.AdminDataTableModule),
      },
      {
        path: 'appointment',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'specialities',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./specialities/specialities.module').then(
            (m) => m.SpecialitiesModule
          ),
      },
      {
        path: 'blog',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./blog/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'blog-details',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./blog/blog-details/blog-details.module').then(
            (m) => m.BlogDetailsModule
          ),
      },
      {
        path: 'add-blog',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./blog/add-blog/add-blog.module').then(
            (m) => m.AddBlogModule
          ),
      },
      {
        path: 'pending-blog',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./blog/pending-blog/pending-blog.module').then(
            (m) => m.PendingBlogModule
          ),
      },
      {
        path: 'edit-blog',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./blog/edit-blog/edit-blog.module').then(
            (m) => m.EditBlogModule
          ),
      },
      {
        path: 'product-list',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: 'pharmacy-list',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./pharmacy-list/pharmacy-list.module').then(
            (m) => m.PharmacyListModule
          ),
      },
      {
        path: 'doctor',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },
      {
        path: 'patients',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'transactions',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'settings',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'reviews',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'invoice-reports',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./invoice-reports/invoice-reports.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },
      {
        path: 'orders_sent',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./orders-sent/orders-sent.module').then(
            (m) => m.OrdersSentModule
          ),
      },
      {
        path: 'orders-received',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./orders-received/orders-received.module').then(
            (m) => m.OrdersReceivedModule
          ),
      },

      {
        path: 'create_order',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./orders-sent/create-order/create-order.module').then(
            (m) => m.CreateOrderModule
          ),
      },

      /* team routing */
      {
        path: 'team',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./team/team.module').then((m) => m.TeamModule),
      },
      /* office routing */
      {
        path: 'office',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./office/office.module').then((m) => m.OfficeModule),
      },

      /* accounting */
      {
        path: 'accounting',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
      /* translate */
      {
        path: 'translate',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./translate/translate.module').then((m) => m.TranslateModule),
      },
      {
        path: 'shop',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'gallery',
        canActivate: [Routingguard],
        loadChildren: () =>
          import('./galleries/galleries.module').then((m) => m.GalleriesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Routingguard],
})
export class AdminRoutingModule {}
