import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcitypartnersComponent } from './allcitypartners.component';

const routes: Routes = [{ path: '', component: AllcitypartnersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllcitypartnersRoutingModule { }
