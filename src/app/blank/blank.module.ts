import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from './blank.component';
import { BlankRoutingModule } from './blank-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  NgxLoadingXConfig,
  NgxLoadingXModule,
  POSITION,
  SPINNER,
} from 'ngx-loading-x';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxButtonModule,
  DxFileManagerModule,
} from 'devextreme-angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 20,

  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 150,
  spinnerColor: '#3085d6',
  spinnerPosition: POSITION.centerCenter,
};
const config: SocketIoConfig = {
  url: 'https://realtime.aroundorder.com:3200',
  options: {},
};
@NgModule({
  declarations: [BlankComponent],
  imports: [
    CommonModule,
    BlankRoutingModule,
    MatStepperModule,
    SlickCarouselModule,
    MatStepperModule,
    SlickCarouselModule,
    NgSelectModule,
    SharedModule,
    CarouselModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    CdkAccordionModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    SocketIoModule.forRoot(config),
    
 
  ],
})
export class BlankModule {}
