import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunServicesRoutingModule } from './commun-services-routing.module';
import { CommunServicesComponent } from './commun-services.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

@NgModule({
  declarations: [CommunServicesComponent],
  imports: [CommonModule, CrystalLightboxModule, CommunServicesRoutingModule],
})
export class CommunServicesModule {}
