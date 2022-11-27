import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateComponent } from './translate.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [TranslateComponent],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    MatDialogModule
  ]
})
export class TranslateModule { }
