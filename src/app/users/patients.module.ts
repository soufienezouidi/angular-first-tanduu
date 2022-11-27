import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';

import { PatientsComponent } from './patients.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { simpleuserguard } from '../globals/routingguard';
const config: SocketIoConfig = {
  url: 'https://realtime.aroundorder.com:3200',
  options: {},
};
@NgModule({
  declarations: [PatientsComponent, SidemenuComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NgbModule,
    NgSelect2Module,
    SocketIoModule.forRoot(config),
  ],
  providers: [simpleuserguard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientsModule {}
