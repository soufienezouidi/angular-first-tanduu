import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategdescsRoutingModule } from './categdescs-routing.module';
import { CategdescsComponent } from './categdescs.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategdescsComponent],
  imports: [
    CommonModule,
    CategdescsRoutingModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class CategdescsModule { }
