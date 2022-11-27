import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorEditBlogComponent } from './doctor-edit-blog.component';

const routes: Routes = [{ path: '', component: DoctorEditBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorEditBlogRoutingModule { }
