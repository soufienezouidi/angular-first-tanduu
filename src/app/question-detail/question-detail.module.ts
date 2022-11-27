import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { QuestionDetailComponent } from './question-detail.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

@NgModule({
  declarations: [QuestionDetailComponent],
  imports: [CommonModule, QuestionDetailRoutingModule, CrystalLightboxModule],
})
export class QuestionDetailModule {}
