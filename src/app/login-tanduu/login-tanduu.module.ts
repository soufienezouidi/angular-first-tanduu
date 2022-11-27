import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginTanduuRoutingModule } from './login-tanduu-routing.module';
import { LoginTanduuComponent } from './login-tanduu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginTanduuComponent],
  imports: [
    CommonModule,
    LoginTanduuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginTanduuModule {}
