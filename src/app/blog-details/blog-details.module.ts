import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [BlogDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    BlogDetailsRoutingModule,
    SlickCarouselModule,
    CarouselModule,
  ],
})
export class BlogDetailsModule {}
