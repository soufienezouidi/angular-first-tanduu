import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunServicesListRoutingModule } from './commun-services-list-routing.module';
import { CommunServicesListComponent } from './commun-services-list.component';


@NgModule({
  declarations: [CommunServicesListComponent],
  imports: [
    CommonModule,
    CommunServicesListRoutingModule
  ]
})
export class CommunServicesListModule { }
