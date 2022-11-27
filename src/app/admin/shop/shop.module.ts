import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  DxDataGridModule,
  DxLoadPanelModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CrystalLightboxModule,
    DxDataGridModule,
    DxTemplateModule,
    DxLoadPanelModule,
    FormsModule,
    NgxDropzoneModule,
    SharedModule,
  ],
})
export class ShopModule {}
