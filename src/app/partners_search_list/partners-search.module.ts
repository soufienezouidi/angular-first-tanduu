import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGridComponent } from './partners-search.component';
import { MapGridRoutingModule } from './partners-search-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelect2Module } from 'ng-select2';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import {
  NgxLoadingXConfig,
  NgxLoadingXModule,
  POSITION,
  SPINNER,
} from 'ngx-loading-x';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [MapGridComponent],
  imports: [
    CommonModule,
    MapGridRoutingModule,
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
export class MapGridModule {}
