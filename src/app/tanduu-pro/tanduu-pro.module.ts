import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TanduuProRoutingModule } from './tanduu-pro-routing.module';
import { TanduuProComponent } from './tanduu-pro.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [TanduuProComponent],
  imports: [CommonModule, TanduuProRoutingModule, SlickCarouselModule],
})
export class TanduuProModule {}
