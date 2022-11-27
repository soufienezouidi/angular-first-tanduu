import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyProfileRoutingModule } from './agency-profile-routing.module';
import { AgencyProfileComponent } from './agency-profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [AgencyProfileComponent],
  imports: [CommonModule, AgencyProfileRoutingModule, SlickCarouselModule],
})
export class AgencyProfileModule {}
