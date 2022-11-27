import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskUsComponent } from './ask-us.component';

const routes: Routes = [{ path: '', component: AskUsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskUsRoutingModule { }
