import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleriesRoutingModule } from './galleries-routing.module';
import { GalleriesComponent } from './galleries.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  DxTileViewModule,
  DxButtonModule,
  DxListModule,
  DxDataGridModule,
  DxCheckBoxModule,
} from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GalleriesComponent],
  imports: [
    CommonModule,
    GalleriesRoutingModule,
    FormsModule,
    CrystalLightboxModule,
    SharedModule,
    DxTileViewModule,
    DxButtonModule,
    NgxDropzoneModule,
    DxListModule,
    DxDataGridModule,
    DxCheckBoxModule,
  ],
})
export class GalleriesModule {}
