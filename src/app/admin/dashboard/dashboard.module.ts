import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForgotPasswordModule } from './../../forgot-password/forgot-password.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// import { MorrisJsModule } from 'angular-morris-js';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ForgotPasswordModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    NgMultiSelectDropDownModule.forRoot(),
    /* TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
        defaultLanguage: 'en'
    })*/
    // MorrisJsModule,
  ],
})
export class DashboardModule {}
