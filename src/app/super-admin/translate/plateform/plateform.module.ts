import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlateformRoutingModule } from './plateform-routing.module';
import { PlateformComponent } from './plateform.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlateformComponent],
  imports: [
    CommonModule,
    PlateformRoutingModule,
    FormsModule
  ]
})
export class PlateformModule { }
