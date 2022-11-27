import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { commercial_guard } from '../globals/routingguard';
import { DoctorChangePasswordModule } from './doctor-change-password/doctor-change-password.module';

import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'appointment',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'clients',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./mypatients/mypatients.module').then(
            (m) => m.MypatientsModule
          ),
      },
      {
        path: 'scheduletiming',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./scheduletiming/scheduletiming.module').then(
            (m) => m.ScheduletimingModule
          ),
      },
      {
        path: 'available-timings',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./available-timings/available-timings.module').then(
            (m) => m.AvailableTimingsModule
          ),
      },
      {
        path: 'invoice',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'reviews',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'settings',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'social-media',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
      {
        path: 'message',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'balancing-list',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'doctor-change-password',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./doctor-change-password/doctor-change-password.module').then(
            (m) => m.DoctorChangePasswordModule
          ),
      },
      {
        path: 'doctor-register',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'doctor-blog',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./doctor-blog/doctor-blog.module').then(
            (m) => m.DoctorBlogModule
          ),
      },
      {
        path: 'doctor-add-blog',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./doctor-add-blog/doctor-add-blog.module').then(
            (m) => m.DoctorAddBlogModule
          ),
      },
      {
        path: 'doctor-pending-blog',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./doctor-pending-blog/doctor-pending-blog.module').then(
            (m) => m.DoctorPendingBlogModule
          ),
      },
      {
        path: 'doctor-edit-blog',
        canActivate: [commercial_guard],
        loadChildren: () =>
          import('./doctor-edit-blog/doctor-edit-blog.module').then(
            (m) => m.DoctorEditBlogModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [commercial_guard],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
