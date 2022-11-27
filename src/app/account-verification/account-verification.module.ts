import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountVerificationRoutingModule } from './account-verification-routing.module';
import { AccountVerificationComponent } from './account-verification.component';

import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  declarations: [AccountVerificationComponent],
  imports: [CommonModule, AccountVerificationRoutingModule, NgOtpInputModule],
})
export class AccountVerificationModule {}
