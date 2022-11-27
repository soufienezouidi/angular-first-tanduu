import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPartnerRoutingModule } from './register-partner-routing.module';
import { RegisterPartnerComponent } from './register-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import {
  NgxLoadingXConfig,
  NgxLoadingXModule,
  POSITION,
  SPINNER,
} from 'ngx-loading-x';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
  declarations: [RegisterPartnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegisterPartnerRoutingModule,
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
export class RegisterPartnerModule {}
