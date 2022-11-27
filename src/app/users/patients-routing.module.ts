import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { simpleuserguard } from '../globals/routingguard';

import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'favourites',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./favourites/favourites.module').then(
            (m) => m.FavouritesModule
          ),
      },
      {
        path: 'mailbox',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./message/message.module').then((m) => m.MessageModule),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then((m) => m.ComponentModule),
      },
      {
        path: 'patient-profile',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./patient-profile/patient-profile.module').then(
            (m) => m.PatientProfileModule
          ),
      },
      {
        path: 'add-billing',
        loadChildren: () =>
          import('./add-billing/add-billing.module').then(
            (m) => m.AddBillingModule
          ),
      },
      {
        path: 'edit-billing',
        loadChildren: () =>
          import('./edit-billing/edit-billing.module').then(
            (m) => m.EditBillingModule
          ),
      },
      {
        path: 'add-prescription',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'add-prescription',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./edit-prescription/edit-prescription.module').then(
            (m) => m.EditPrescriptionModule
          ),
      },
      {
        path: 'edit-prescription',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'partner-profile',
        loadChildren: () =>
          import('./doctor-profile/doctor-profile.module').then(
            (m) => m.DoctorProfileModule
          ),
      },
      {
        path: 'settings',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'search-doctor',
        loadChildren: () =>
          import('./search-doctor/search-doctor.module').then(
            (m) => m.SearchDoctorModule
          ),
      },
      {
        path: 'success',
        loadChildren: () =>
          import('./success/success.module').then((m) => m.SuccessModule),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
      },
      {
        path: 'dependent',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./dependent/dependent.module').then((m) => m.DependentModule),
      },
      {
        path: 'accounts',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./patient-accounts/patient-accounts.module').then(
            (m) => m.PatientAccountsModule
          ),
      },
      {
        path: 'orders',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./orders-list/orders-list.module').then(
            (m) => m.OrdersListModule
          ),
      },
      {
        path: 'medical-records',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./medical-records/medical-records.module').then(
            (m) => m.MedicalRecordsModule
          ),
      },
      {
        path: 'medical-details',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./medical-details/medical-details.module').then(
            (m) => m.MedicalDetailsModule
          ),
      },
      {
        path: 'patients-change-password',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import(
            './patients-change-password/patients-change-password.module'
          ).then((m) => m.PatientsChangePasswordModule),
      },
      {
        path: 'chat',
        canActivate: [simpleuserguard],
        loadChildren: () =>
          import('./patient-chat/patient-chat.module').then(
            (m) => m.PatientChatModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [simpleuserguard],
})
export class PatientsRoutingModule {}
