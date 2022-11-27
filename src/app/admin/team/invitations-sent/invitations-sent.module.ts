import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitationsSentRoutingModule } from './invitations-sent-routing.module';
import { InvitationsSentComponent } from './invitations-sent.component';
import { GridModule, SearchService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { FilterPipe } from './filter.pipe';
import { CdkAccordionModule } from '@angular/cdk/accordion';



@NgModule({
  declarations: [InvitationsSentComponent, FilterPipe],
  imports: [
    CommonModule,
    InvitationsSentRoutingModule,
    FormsModule,
    GridModule,
    CdkAccordionModule
  ],
  providers: [SearchService, ToolbarService, EditService]
})
export class InvitationsSentModule { }
