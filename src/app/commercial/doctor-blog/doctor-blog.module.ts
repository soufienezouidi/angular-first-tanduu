import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorBlogRoutingModule } from './doctor-blog-routing.module';
import { DoctorBlogComponent } from './doctor-blog.component';


@NgModule({
  declarations: [DoctorBlogComponent],
  imports: [
    CommonModule,
    DoctorBlogRoutingModule
  ]
})
export class DoctorBlogModule { }
