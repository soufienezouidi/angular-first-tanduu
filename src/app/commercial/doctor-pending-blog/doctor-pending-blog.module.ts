import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorPendingBlogRoutingModule } from './doctor-pending-blog-routing.module';
import { DoctorPendingBlogComponent } from './doctor-pending-blog.component';


@NgModule({
  declarations: [DoctorPendingBlogComponent],
  imports: [
    CommonModule,
    DoctorPendingBlogRoutingModule
  ]
})
export class DoctorPendingBlogModule { }
