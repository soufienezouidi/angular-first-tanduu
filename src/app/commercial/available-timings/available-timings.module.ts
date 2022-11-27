import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableTimingsRoutingModule } from './available-timings-routing.module';
import { AvailableTimingsComponent } from './available-timings.component';


@NgModule({
  declarations: [AvailableTimingsComponent],
  imports: [
    CommonModule,
    AvailableTimingsRoutingModule
  ]
})
export class AvailableTimingsModule { }
