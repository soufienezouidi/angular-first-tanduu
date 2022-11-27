import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBlogRoutingModule } from './edit-blog-routing.module';
import { EditBlogComponent } from './edit-blog.component';


@NgModule({
  declarations: [EditBlogComponent],
  imports: [
    CommonModule,
    EditBlogRoutingModule
  ]
})
export class EditBlogModule { }
