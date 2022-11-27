import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypatientsRoutingModule } from './mypatients-routing.module';
import { MypatientsComponent } from './mypatients.component';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [MypatientsComponent],
  imports: [
    CommonModule,
    MypatientsRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
  ],
})
export class MypatientsModule {}
