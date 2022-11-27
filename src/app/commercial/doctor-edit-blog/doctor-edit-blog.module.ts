import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorEditBlogRoutingModule } from './doctor-edit-blog-routing.module';
import { DoctorEditBlogComponent } from './doctor-edit-blog.component';


@NgModule({
  declarations: [DoctorEditBlogComponent],
  imports: [
    CommonModule,
    DoctorEditBlogRoutingModule
  ]
})
export class DoctorEditBlogModule { }
