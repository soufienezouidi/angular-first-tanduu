import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatTableModule } from '@angular/material/table';
import { TagInputModule } from 'ngx-chips';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    MatTableModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
})
export class ServicesModule {}
