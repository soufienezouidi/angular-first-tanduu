import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPassowrdComponent } from './reset-passowrd.component';

const routes: Routes = [{ path: '', component: ResetPassowrdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPassowrdRoutingModule { }
