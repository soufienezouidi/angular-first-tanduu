import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapListRoutingModule } from './map-list-routing.module';
import { MapListComponent } from './map-list.component';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [MapListComponent],
  imports: [
    CommonModule,
    MapListRoutingModule,
    NgSelect2Module
  ]
})
export class MapListModule { }
