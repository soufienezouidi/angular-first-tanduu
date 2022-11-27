import { AgmCoreModule } from '@agm/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DragScrollModule } from 'ngx-drag-scroll';
import { LightboxModule } from 'ngx-lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared.module';
import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorProfileComponent } from './doctor-profile.component';

@NgModule({
  declarations: [DoctorProfileComponent],
  imports: [
    CommonModule,
    DoctorProfileRoutingModule,
    CrystalLightboxModule,

    GoogleMapsModule,
    CdkAccordionModule,
    MatDialogModule,
    SlickCarouselModule,
    DragScrollModule,
    ModalModule.forRoot(),
    LightboxModule,
    CdkAccordionModule,
    MatExpansionModule,
    CarouselModule,
    SlickCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlpSL5DcLnIobX5m_MiHKYOEQmqoutIVc', // api key google map
      libraries: ['places'],
    }),
    SharedModule,
  ],
})
export class DoctorProfileModule {}
