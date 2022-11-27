import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskUsRoutingModule } from './ask-us-routing.module';
import { AskUsComponent } from './ask-us.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
@NgModule({
  declarations: [AskUsComponent],
  imports: [
    CommonModule,
    AskUsRoutingModule,
    CdkAccordionModule,
    MatDialogModule,
    CrystalLightboxModule,
    AngularTagsInputModule,
  ],
})
export class AskUsModule {}
