import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorAddBlogRoutingModule } from './doctor-add-blog-routing.module';
import { DoctorAddBlogComponent } from './doctor-add-blog.component';


@NgModule({
  declarations: [DoctorAddBlogComponent],
  imports: [
    CommonModule,
    DoctorAddBlogRoutingModule
  ]
})
export class DoctorAddBlogModule { }
