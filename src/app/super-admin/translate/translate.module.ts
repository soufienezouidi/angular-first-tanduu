import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateComponent } from './translate.component';
import { FormsModule, NgForm } from '@angular/forms';


@NgModule({
  declarations: [TranslateComponent],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    FormsModule
  ]
})
export class TranslateModule { }
