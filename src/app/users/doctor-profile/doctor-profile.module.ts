import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorProfileComponent } from './doctor-profile.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { GoogleMapsModule } from '@angular/google-maps';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LightboxModule } from 'ngx-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';

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

    SharedModule,
  ],
})
export class DoctorProfileModule {}
