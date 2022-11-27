import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyAdminRoutingModule } from './super-admin-routing.module';
import { PharmacyAdminComponent } from './super-admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { tanduu_adminguard } from '../globals/routingguard';

@NgModule({
  declarations: [PharmacyAdminComponent, SidemenuComponent],
  imports: [
    CommonModule,
    PharmacyAdminRoutingModule,
    NgbModule,
    MatDialogModule,
    FormsModule,

    ModalModule.forRoot(),

    MatSelectCountryModule.forRoot('de'),
  ],
  providers: [tanduu_adminguard],
})
export class PharmacyAdminModule {}
