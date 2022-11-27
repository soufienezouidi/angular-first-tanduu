import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllcitypartnersRoutingModule } from './allcitypartners-routing.module';
import { AllcitypartnersComponent } from './allcitypartners.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgmDirectionModule } from 'agm-direction';
import { NgSelect2Module } from 'ng-select2';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  NgxLoadingXConfig,
  NgxLoadingXModule,
  POSITION,
  SPINNER,
} from 'ngx-loading-x';
import { SharedModule } from '../shared/shared.module';
const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 120,
  spinnerColor: '009FE3',
  spinnerPosition: POSITION.centerCenter,
};

@NgModule({
  declarations: [AllcitypartnersComponent],
  imports: [
    CommonModule,
    AllcitypartnersRoutingModule,
    GoogleMapsModule,
    NgSelect2Module,
    FormsModule,
    CrystalLightboxModule,
    TooltipModule,
    FontAwesomeModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    MatDialogModule,
    MatSliderModule,
    MatButtonToggleModule,
    SharedModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlpSL5DcLnIobX5m_MiHKYOEQmqoutIVc', // api key google map
      libraries: ['places'],
    }),
    AgmDirectionModule,
  ],
})
export class AllcitypartnersModule {}
