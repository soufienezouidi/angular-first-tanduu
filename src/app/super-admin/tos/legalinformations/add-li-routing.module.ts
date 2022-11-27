import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLegalInformations } from './add-li.component';

const routes: Routes = [
  {
    path: '',
    component: AddLegalInformations,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBlogRoutingModule {}
