import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatefromRoutingModule } from './platefrom-routing.module';
import { PlatefromComponent } from './platefrom.component';


@NgModule({
  declarations: [PlatefromComponent],
  imports: [
    CommonModule,
    PlatefromRoutingModule
  ]
})
export class PlatefromModule { }
