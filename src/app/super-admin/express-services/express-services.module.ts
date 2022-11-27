import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressServicesRoutingModule } from './express-services-routing.module';
import { ExpressServicesComponent } from './express-services.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ExpressServicesComponent],
  imports: [
    CommonModule,
    ExpressServicesRoutingModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatInputModule,

    ModalModule.forRoot(),
  ],
})
export class ExpressServicesModule {}
