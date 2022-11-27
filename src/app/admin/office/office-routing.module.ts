import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeComponent } from './office.component';

const routes: Routes = [
  { path: '', component: OfficeComponent },
{  
    path: 'calendar',
    loadChildren: () =>
    import('./calendar/calendar.module').then((m) => m.CalendarModule),
  },
   {  
    path: 'customers',
    loadChildren: () =>
    import('./customers/customers.module').then((m) => m.CustomersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
