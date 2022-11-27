import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientChatComponent } from './patient-chat.component';

const routes: Routes = [{ path: '', component: PatientChatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientChatRoutingModule { }
