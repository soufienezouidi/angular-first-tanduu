import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddLegalInformations } from './add-li.component';
import { AddBlogRoutingModule } from './add-li-routing.module';
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [AddLegalInformations],
  imports: [
    CommonModule,
    FormsModule,
    AddBlogRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
})
export class AddLegalInformationsModule {}
