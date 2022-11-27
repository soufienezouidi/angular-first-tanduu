import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPassowrdRoutingModule } from './reset-passowrd-routing.module';
import { ResetPassowrdComponent } from './reset-passowrd.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ResetPassowrdComponent],
  imports: [CommonModule, ResetPassowrdRoutingModule, FormsModule, NgbModule],
})
export class ResetPassowrdModule {}
