import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChatModule } from 'ng-chat';
import { NgSelect2Module } from 'ng-select2';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule,
} from 'ngx-cookieconsent';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import {
  NgxLoadingXConfig,
  NgxLoadingXModule,
  POSITION,
  SPINNER,
} from 'ngx-loading-x';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { Home1footerComponent } from './common/home1footer/home1footer.component';
import { Home1headerComponent } from './common/home1header/home1header.component';
import { Home4footerComponent } from './common/home4footer/home4footer.component';
import { Home4headerComponent } from './common/home4header/home4header.component';
import { Home6footerComponent } from './common/home6footer/home6footer.component';
import { Home6headerComponent } from './common/home6header/home6header.component';
import { Home7footerComponent } from './common/home7footer/home7footer.component';
import { Home7headerComponent } from './common/home7header/home7header.component';
import { Home8footerComponent } from './common/home8footer/home8footer.component';
import { Home8headerComponent } from './common/home8header/home8header.component';
import { SharedModule } from './shared/shared.module';


// AoT requires an exported function for factories
const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 20,

  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 150,
  bgColor: '#ffffff',
  spinnerColor: '#3085d6',
  spinnerPosition: POSITION.centerCenter,
};
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost',
  },
  position: 'top-left',
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#20c0f3',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};

const config: SocketIoConfig = {
  url: 'https://realtime.aroundorder.com:3200',
  options: {},
};
const dbConfig: DBConfig = {
  name: 'tanduudb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'tanduutranslate',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'de',
          keypath: 'de',
          options: { unique: false },
        },
        { name: 'fr', keypath: 'fr', options: { unique: false } },
        {
          name: 'en',
          keypath: 'en',
          options: { unique: false },
        },
      ],
    },
  ],
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Home8headerComponent,
    Home8footerComponent,
    Home1headerComponent,
    Home1footerComponent,
    Home4headerComponent,
    Home4footerComponent,
    Home6headerComponent,
    Home6footerComponent,
    Home7headerComponent,
    Home7footerComponent,
  ],
  imports: [
    AngularTagsInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    NgSelectModule,
    MatCardModule,
    ToastrModule.forRoot(),
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    Daterangepicker,
    NgSelect2Module,
    NgApexchartsModule,
    MatIconModule,
    FontAwesomeModule,
    MatStepperModule,
    MatExpansionModule,
    MatSelectCountryModule.forRoot('de'),
    NgxDropzoneModule,
    MatDialogModule,
    NgChatModule,
    SweetAlert2Module.forRoot(),
    SocketIoModule.forRoot(config),
    CdkAccordionModule,
    MatToolbarModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    DragScrollModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    ModalModule.forRoot(),
    SharedModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
