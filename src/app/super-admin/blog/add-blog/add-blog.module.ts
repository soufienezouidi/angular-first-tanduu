import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBlogComponent } from './add-blog.component';
import { AddBlogRoutingModule } from './add-blog-routing.module';
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [AddBlogComponent],
  imports: [
    CommonModule,
    FormsModule,
    AddBlogRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
})
export class AddBlogModule {}
