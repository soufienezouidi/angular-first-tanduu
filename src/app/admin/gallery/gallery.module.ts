import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    CrystalLightboxModule,
    SharedModule,
  ],
})
export class GalleryModule {}
