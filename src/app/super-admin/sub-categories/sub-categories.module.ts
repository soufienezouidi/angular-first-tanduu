import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubCategoriesComponent } from './sub-categories.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubCategoriesComponent],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
})
export class SubCategoriesModule {}
