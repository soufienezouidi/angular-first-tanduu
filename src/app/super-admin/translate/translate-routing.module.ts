import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateComponent } from './translate.component';

const routes: Routes = [
  { path: '', component: TranslateComponent },
  {
    path: 'crm',
    loadChildren: () =>
      import('./crm/crm.module').then((m) => m.CrmModule),
  },
  {
    path: 'plateform',
    loadChildren: () =>
      import('./plateform/plateform.module').then(m => m.PlateformModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule { }
