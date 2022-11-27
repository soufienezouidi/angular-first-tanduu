import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ServiceComponent } from './service/service.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  GridModule,
  SearchService,
  ToolbarService,
  PageService,
} from '@syncfusion/ej2-angular-grids';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  DxTileViewModule,
  DxButtonModule,
  DxListModule,
  DxDataGridModule, DxCheckBoxModule
} from 'devextreme-angular';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// import { MorrisJsModule } from 'angular-morris-js';

@NgModule({
  declarations: [ProfileComponent, ServiceComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DxTileViewModule,
    DxDataGridModule,
     DxCheckBoxModule,
    NgMultiSelectDropDownModule,
    DxButtonModule,
    DxListModule,
    NgxDropzoneModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatDialogModule,
    MatSlideToggleModule,
    InternationalPhoneNumberModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    NgSelectModule,
    MatExpansionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatStepperModule,
    MatGridListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    FormsModule,
    GridModule,
    MatProgressBarModule,
    AngularEditorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatListModule,
    TagInputModule,
    NgSelect2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlpSL5DcLnIobX5m_MiHKYOEQmqoutIVc', // api key google map
      libraries: ['places'],
    }),
    AgmDirectionModule,
  ],
  providers: [SearchService, ToolbarService, PageService],
})
export class ProfileModule {}
