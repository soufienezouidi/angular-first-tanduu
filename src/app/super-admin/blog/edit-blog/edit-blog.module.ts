import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBlogRoutingModule } from './edit-blog-routing.module';
import { EditBlogComponent } from './edit-blog.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [EditBlogComponent],
  imports: [
    EditBlogRoutingModule,
    CommonModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
})
export class EditBlogModule {}
