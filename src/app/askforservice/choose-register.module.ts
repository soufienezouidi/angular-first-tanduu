import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChooseRegisterRoutingModule } from './askforservice-routing.module';
import { ChooseRegisterComponent } from './askforservice.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChooseRegisterComponent],
  imports: [
    CommonModule,
    ChooseRegisterRoutingModule,
    CdkAccordionModule,
    MatDialogModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
})
export class ChooseRegisterModule { }
