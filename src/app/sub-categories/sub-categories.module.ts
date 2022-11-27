import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubCategoriesComponent } from './sub-categories.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [SubCategoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SubCategoriesRoutingModule,
    SlickCarouselModule,
    CarouselModule,
    MatDialogModule,
    ModalModule.forRoot(),
    SharedModule,
    SlickCarouselModule,
    CdkAccordionModule,
    AngularEditorModule,
  ],
})
export class SubCategoriesModule {}
